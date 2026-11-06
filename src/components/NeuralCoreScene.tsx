import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export type FinishPreset = 'cobalt' | 'cryo' | 'obsidian';
export type CameraPreset = 'isometric' | 'macro' | 'top' | 'horizon';

interface NeuralCoreSceneProps {
  theme: 'dark' | 'light';
  exploded: number;
  finish: FinishPreset;
  cameraPreset: CameraPreset;
  activeNodeIndex: number | null;
  onSelectNode: (index: number) => void;
}

// Pre-allocated math scratch objects at module scope (Zero GC in render loop)
const _tempVec3 = new THREE.Vector3();
const _camTargetPos = new THREE.Vector3();
const _camLookTarget = new THREE.Vector3();
const _dummyObj = new THREE.Object3D();
const _instanceColor = new THREE.Color();

function createProceduralDialTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#0B1325';
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 2;
    const cx = 256;
    const cy = 256;

    // Concentric rings
    [140, 180, 220, 240].forEach((r, idx) => {
      ctx.beginPath();
      ctx.globalAlpha = idx % 2 === 0 ? 0.55 : 0.25;
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Precision radial tick markings
    for (let i = 0; i < 72; i++) {
      const angle = (i / 72) * Math.PI * 2;
      const inner = i % 6 === 0 ? 185 : 202;
      const outer = 218;
      ctx.globalAlpha = i % 6 === 0 ? 0.85 : 0.35;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * inner, cy + Math.sin(angle) * inner);
      ctx.lineTo(cx + Math.cos(angle) * outer, cy + Math.sin(angle) * outer);
      ctx.stroke();
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  tex.needsUpdate = true;
  return tex;
}

function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(128, 128, 12, 128, 128, 120);
    grad.addColorStop(0, 'rgba(3, 7, 18, 0.72)');
    grad.addColorStop(0.55, 'rgba(3, 7, 18, 0.28)');
    grad.addColorStop(1, 'rgba(3, 7, 18, 0.0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

export const NeuralCoreScene: React.FC<NeuralCoreSceneProps> = ({
  theme,
  exploded,
  finish,
  cameraPreset,
  activeNodeIndex,
  onSelectNode,
}) => {
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const [webglFallback, setWebglFallback] = useState(false);

  // Store mutable props in refs so React UI updates never tear down or reset the WebGL scene
  const stateRef = useRef({
    theme,
    exploded,
    finish,
    cameraPreset,
    activeNodeIndex,
    onSelectNode,
    currentExploded: exploded,
    transitioningCamera: false,
  });

  useEffect(() => {
    const prevPreset = stateRef.current.cameraPreset;
    stateRef.current.theme = theme;
    stateRef.current.exploded = exploded;
    stateRef.current.finish = finish;
    stateRef.current.cameraPreset = cameraPreset;
    stateRef.current.activeNodeIndex = activeNodeIndex;
    stateRef.current.onSelectNode = onSelectNode;
    if (prevPreset !== cameraPreset) {
      stateRef.current.transitioningCamera = true;
    }
  }, [theme, exploded, finish, cameraPreset, activeNodeIndex, onSelectNode]);

  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    // 1. Software-WebGL Guard
    const isSoftwareGl = (() => {
      try {
        const probeCanvas = document.createElement('canvas');
        const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglFallback(true);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // WebGL context loss safety
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebglFallback(true);
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);

    const scene = new THREE.Scene();
    const initialBg = stateRef.current.theme === 'dark' ? 0x060b16 : 0xf1f5f9;
    scene.background = new THREE.Color(initialBg);
    scene.fog = new THREE.FogExp2(initialBg, 0.032);

    // 2. Mandatory Studio Environment Reflection (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    pmremGenerator.dispose();

    // Camera & OrbitControls
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(4.8, 3.3, 6.2);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1.45, 0);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3.2;
    controls.maxDistance = 13.5;
    controls.maxPolarAngle = Math.PI / 2 - 0.03;
    controls.enablePan = false;

    const handleControlStart = () => {
      stateRef.current.transitioningCamera = false;
    };
    controls.addEventListener('start', handleControlStart);

    // 3. Balanced 3-Point Studio Lighting Rig (<= 3 Shadow Casters)
    const hemiLight = new THREE.HemisphereLight(0x93c5fd, 0x0f172a, 0.85);
    hemiLight.position.set(0, 12, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.2);
    keyLight.position.set(5.5, 8.5, 5.0);
    keyLight.castShadow = !isSoftwareGl;
    const d = 5.5;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 22;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x06b6d4, 1.65);
    rimLight.position.set(-6.0, 4.5, -5.5);
    scene.add(rimLight);

    // Procedural Textures
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const dialTexture = createProceduralDialTexture(maxAniso);
    const shadowTexture = createContactShadowTexture();

    // Shared PBR Materials (roughness varied by >= 0.25 between adjacent parts)
    const primaryAlloyMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e3a8a,
      metalness: 0.92,
      roughness: 0.18,
      anisotropy: 0.75,
      clearcoat: 0.4,
    });

    const secondaryChassisMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.75,
      roughness: 0.48,
    });

    const brushedTitaniumMat = new THREE.MeshPhysicalMaterial({
      color: 0x94a3b8,
      metalness: 0.88,
      roughness: 0.2,
      anisotropy: 0.8,
    });

    const coreEmissiveMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.8,
      roughness: 0.15,
      metalness: 0.3,
    });

    const containmentGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xe0f2fe,
      metalness: 0.05,
      roughness: 0.08,
      transmission: isSoftwareGl ? 0 : 0.92,
      transparent: true,
      opacity: isSoftwareGl ? 0.32 : 1.0,
      ior: 1.55,
      thickness: 1.2,
      clearcoat: 1.0,
      depthWrite: false,
    });

    const dialPlateMat = new THREE.MeshStandardMaterial({
      map: dialTexture,
      roughness: 0.42,
      metalness: 0.65,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });

    // 4. Composite 10-Part Procedural Assembly (`THREE.Group`) pivoted at y = 0
    const rootAssembly = new THREE.Group();
    rootAssembly.position.set(0, 0, 0);
    scene.add(rootAssembly);

    // Part 1: Grounded Contact Shadow Plane (y = 0.01) & Calibration Dial Base (y = 0.03)
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(7.2, 7.2),
      new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true,
        depthWrite: false,
        opacity: 0.55,
      })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0.01;
    rootAssembly.add(shadowPlane);

    // Part 2: Architectural Step-Turned Pedestal (flush with ground y = 0)
    const pedestalPoints = [
      new THREE.Vector2(0.0, 0.0),
      new THREE.Vector2(1.85, 0.0),
      new THREE.Vector2(1.75, 0.12),
      new THREE.Vector2(1.35, 0.18),
      new THREE.Vector2(1.25, 0.32),
      new THREE.Vector2(0.85, 0.38),
      new THREE.Vector2(0.0, 0.38),
    ];
    const pedestalGeo = new THREE.LatheGeometry(pedestalPoints, 48);
    const pedestalMesh = new THREE.Mesh(pedestalGeo, secondaryChassisMat);
    pedestalMesh.receiveShadow = true;
    pedestalMesh.castShadow = true;
    rootAssembly.add(pedestalMesh);

    const dialDiscGeo = new THREE.CircleGeometry(1.72, 64);
    const dialDiscMesh = new THREE.Mesh(dialDiscGeo, dialPlateMat);
    dialDiscMesh.rotation.x = -Math.PI / 2;
    dialDiscMesh.position.y = 0.13;
    rootAssembly.add(dialDiscMesh);

    // Center Elevation Pivot for Neural Core (y = 1.65)
    const coreCenterY = 1.65;

    // Part 3: Inner Faceted Icosahedral Neural Core
    const innerCoreGroup = new THREE.Group();
    innerCoreGroup.position.set(0, coreCenterY, 0);
    rootAssembly.add(innerCoreGroup);

    const icosaGeo = new THREE.IcosahedronGeometry(0.58, 1);
    const icosaMesh = new THREE.Mesh(icosaGeo, coreEmissiveMat);
    icosaMesh.castShadow = true;
    innerCoreGroup.add(icosaMesh);

    const coreCageGeo = new THREE.IcosahedronGeometry(0.66, 1);
    const coreCageMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.9,
      roughness: 0.25,
      wireframe: true,
    });
    const coreCageMesh = new THREE.Mesh(coreCageGeo, coreCageMat);
    innerCoreGroup.add(coreCageMesh);

    // Part 4: Optical Glass Containment Sphere (renderOrder = 3, depthWrite = false)
    const glassSphereGeo = new THREE.SphereGeometry(0.84, 36, 36);
    const glassSphereMesh = new THREE.Mesh(glassSphereGeo, containmentGlassMat);
    glassSphereMesh.position.set(0, coreCenterY, 0);
    glassSphereMesh.renderOrder = 3;
    rootAssembly.add(glassSphereMesh);

    // Part 5: Bevel-Extruded Primary Gyroscopic Ring
    const ringShape = new THREE.Shape();
    ringShape.absarc(0, 0, 1.32, 0, Math.PI * 2, false);
    const ringHole = new THREE.Path();
    ringHole.absarc(0, 0, 1.14, 0, Math.PI * 2, true);
    ringShape.holes.push(ringHole);

    const ringExtrudeGeo = new THREE.ExtrudeGeometry(ringShape, {
      depth: 0.09,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.025,
      bevelThickness: 0.025,
      curveSegments: 48,
    });
    ringExtrudeGeo.center();
    const outerGyroRing = new THREE.Mesh(ringExtrudeGeo, primaryAlloyMat);
    outerGyroRing.position.set(0, coreCenterY, 0);
    outerGyroRing.castShadow = true;
    rootAssembly.add(outerGyroRing);

    // Part 6: Counter-Rotating Equatorial Telemetry Gimbal
    const middleGimbalGroup = new THREE.Group();
    middleGimbalGroup.position.set(0, coreCenterY, 0);
    rootAssembly.add(middleGimbalGroup);

    const torusGeo = new THREE.TorusGeometry(1.56, 0.045, 20, 72);
    const middleGimbalMesh = new THREE.Mesh(torusGeo, brushedTitaniumMat);
    middleGimbalMesh.rotation.x = Math.PI / 2;
    middleGimbalMesh.castShadow = true;
    middleGimbalGroup.add(middleGimbalMesh);

    // Part 7: Lathe-Turned Polar Magnetic Emitters (Top & Bottom)
    const emitterPoints = [
      new THREE.Vector2(0.0, 0.0),
      new THREE.Vector2(0.32, 0.0),
      new THREE.Vector2(0.28, 0.14),
      new THREE.Vector2(0.18, 0.22),
      new THREE.Vector2(0.22, 0.34),
      new THREE.Vector2(0.1, 0.46),
      new THREE.Vector2(0.0, 0.46),
    ];
    const emitterGeo = new THREE.LatheGeometry(emitterPoints, 32);

    const topEmitter = new THREE.Mesh(emitterGeo, brushedTitaniumMat);
    topEmitter.position.set(0, coreCenterY + 0.92, 0);
    topEmitter.castShadow = true;
    rootAssembly.add(topEmitter);

    const bottomEmitter = new THREE.Mesh(emitterGeo, brushedTitaniumMat);
    bottomEmitter.rotation.x = Math.PI;
    bottomEmitter.position.set(0, coreCenterY - 0.92, 0);
    bottomEmitter.castShadow = true;
    rootAssembly.add(bottomEmitter);

    // Part 8: 4 Curved Fiber-Optic Data Conduits (`TubeGeometry`)
    const conduitGroup = new THREE.Group();
    conduitGroup.position.set(0, coreCenterY, 0);
    rootAssembly.add(conduitGroup);

    const conduitMeshes: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const rMid = 1.68;
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(Math.cos(angle) * 0.25, -0.95, Math.sin(angle) * 0.25),
        new THREE.Vector3(Math.cos(angle) * rMid, -0.35, Math.sin(angle) * rMid),
        new THREE.Vector3(Math.cos(angle) * rMid, 0.35, Math.sin(angle) * rMid),
        new THREE.Vector3(Math.cos(angle) * 0.25, 0.95, Math.sin(angle) * 0.25),
      ]);
      const tubeGeo = new THREE.TubeGeometry(curve, 36, 0.028, 12, false);
      const tubeMesh = new THREE.Mesh(tubeGeo, primaryAlloyMat);
      tubeMesh.userData = { dirX: Math.cos(angle), dirZ: Math.sin(angle) };
      conduitGroup.add(tubeMesh);
      conduitMeshes.push(tubeMesh);
    }

    // Part 9: 8 Orbital Project Compute Satellites (Clickable on Raycast Layer 1)
    const satelliteGroup = new THREE.Group();
    satelliteGroup.position.set(0, coreCenterY, 0);
    rootAssembly.add(satelliteGroup);

    const satelliteNodes: THREE.Group[] = [];
    const clickableProxies: THREE.Mesh[] = [];

    const satBodyGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.12, 6);
    const satCapGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const proxyGeo = new THREE.SphereGeometry(0.28, 8, 8);
    const proxyMat = new THREE.MeshBasicMaterial({ visible: false });

    for (let i = 0; i < 8; i++) {
      const nodeHolder = new THREE.Group();
      const angle = (i / 8) * Math.PI * 2;
      const radius = 2.05;
      const yOffset = Math.sin(i * 1.5) * 0.32;

      nodeHolder.position.set(
        Math.cos(angle) * radius,
        yOffset,
        Math.sin(angle) * radius
      );
      nodeHolder.userData = {
        baseAngle: angle,
        baseRadius: radius,
        baseY: yOffset,
        nodeIndex: i,
      };

      const bodyMat = primaryAlloyMat.clone();
      const bodyMesh = new THREE.Mesh(satBodyGeo, bodyMat);
      bodyMesh.castShadow = true;
      nodeHolder.add(bodyMesh);

      const capMat = coreEmissiveMat.clone();
      const capMesh = new THREE.Mesh(satCapGeo, capMat);
      capMesh.position.y = 0.07;
      nodeHolder.add(capMesh);

      // Simplified invisible proxy on Layer 1 for fast raycasting
      const proxyMesh = new THREE.Mesh(proxyGeo, proxyMat);
      proxyMesh.layers.set(1);
      proxyMesh.userData = { nodeIndex: i };
      nodeHolder.add(proxyMesh);
      clickableProxies.push(proxyMesh);

      satelliteGroup.add(nodeHolder);
      satelliteNodes.push(nodeHolder);
    }

    // Part 10: `THREE.InstancedMesh` Synaptic Lattice (48 instances > 20 threshold)
    const latticeCount = 48;
    const latticeGeo = new THREE.OctahedronGeometry(0.045, 0);
    const latticeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.25,
      metalness: 0.8,
    });
    const synapticInstanced = new THREE.InstancedMesh(latticeGeo, latticeMat, latticeCount);
    synapticInstanced.position.set(0, coreCenterY, 0);

    for (let i = 0; i < latticeCount; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / latticeCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 2.45 + (i % 3) * 0.22;

      _dummyObj.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi) * 0.72,
        r * Math.sin(phi) * Math.sin(theta)
      );
      // Subtle ±15% scale variation per instance
      const scaleVar = 0.85 + ((i * 17) % 30) / 100;
      _dummyObj.scale.setScalar(scaleVar);
      _dummyObj.rotation.set(i * 0.4, i * 0.7, 0);
      _dummyObj.updateMatrix();
      synapticInstanced.setMatrixAt(i, _dummyObj.matrix);

      // Cool blue / cyan tint variation
      _instanceColor.setHSL(0.56 + (i % 5) * 0.02, 0.85, 0.55 + (i % 3) * 0.08);
      synapticInstanced.setColorAt(i, _instanceColor);
    }
    synapticInstanced.instanceMatrix.needsUpdate = true;
    if (synapticInstanced.instanceColor) synapticInstanced.instanceColor.needsUpdate = true;
    synapticInstanced.computeBoundingSphere();
    rootAssembly.add(synapticInstanced);

    // Pre-warm shaders on hardware GPUs
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // High-Performance Raycasting on Layer 1
    const raycaster = new THREE.Raycaster();
    raycaster.layers.set(1);
    const pointer = new THREE.Vector2();
    let lastHoverTime = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastHoverTime < 50) return; // Throttled to 20fps max
      lastHoverTime = now;

      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(clickableProxies, false);
      renderer.domElement.style.cursor = hits.length > 0 ? 'pointer' : 'grab';
    };

    const handlePointerDown = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(clickableProxies, false);
      if (hits.length > 0) {
        const idx = hits[0].object.userData.nodeIndex;
        if (typeof idx === 'number') {
          stateRef.current.onSelectNode(idx);
        }
      }
    };

    renderer.domElement.addEventListener('pointermove', handlePointerMove);
    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop with Software-WebGL Pacing Guard (`afterDraw`)
    const clock = new THREE.Clock();
    let frameId = 0;
    let disposed = false;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (gl && typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          if (disposed) return;
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 80);
          }
        };
        frameId = window.setTimeout(poll, 5);
      } else {
        frameId = window.setTimeout(cb, 80);
      }
    }

    function applyThemeAndFinish() {
      const st = stateRef.current;
      const targetBgHex = st.theme === 'dark' ? 0x060b16 : 0xf1f5f9;
      if (scene.background instanceof THREE.Color) {
        scene.background.setHex(targetBgHex);
      }
      if (scene.fog instanceof THREE.FogExp2) {
        scene.fog.color.setHex(targetBgHex);
      }

      if (st.finish === 'cobalt') {
        primaryAlloyMat.color.setHex(0x1d4ed8);
        primaryAlloyMat.roughness = 0.18;
        primaryAlloyMat.metalness = 0.92;
        coreEmissiveMat.color.setHex(0x38bdf8);
        coreEmissiveMat.emissive.setHex(0x0284c7);
      } else if (st.finish === 'cryo') {
        primaryAlloyMat.color.setHex(0x0891b2);
        primaryAlloyMat.roughness = 0.12;
        primaryAlloyMat.metalness = 0.85;
        coreEmissiveMat.color.setHex(0x67e8f9);
        coreEmissiveMat.emissive.setHex(0x06b6d4);
      } else {
        primaryAlloyMat.color.setHex(0x0f172a);
        primaryAlloyMat.roughness = 0.24;
        primaryAlloyMat.metalness = 0.95;
        coreEmissiveMat.color.setHex(0x60a5fa);
        coreEmissiveMat.emissive.setHex(0x2563eb);
      }
    }

    function tick() {
      if (disposed) return;
      const dt = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();
      const st = stateRef.current;

      applyThemeAndFinish();

      // Exponential damping on exploded view factor
      st.currentExploded = THREE.MathUtils.damp(st.currentExploded, st.exploded, 6, dt);
      const exp = st.currentExploded;

      // Rotate inner core & gyroscopic rings smoothly
      innerCoreGroup.rotation.y = elapsed * 0.45;
      innerCoreGroup.rotation.x = Math.sin(elapsed * 0.3) * 0.25;
      coreCageMesh.rotation.y = -elapsed * 0.7;

      outerGyroRing.rotation.y = -elapsed * 0.32;
      outerGyroRing.rotation.x = Math.PI * 0.18 + Math.cos(elapsed * 0.25) * 0.15;
      outerGyroRing.scale.setScalar(1 + exp * 0.28);

      middleGimbalGroup.rotation.z = Math.sin(elapsed * 0.35) * 0.28;
      middleGimbalGroup.rotation.y = elapsed * 0.25;
      middleGimbalGroup.scale.setScalar(1 + exp * 0.36);

      // Explode top & bottom polar emitters along Y
      topEmitter.position.y = coreCenterY + 0.92 + exp * 0.65;
      bottomEmitter.position.y = coreCenterY - 0.92 - exp * 0.65;

      // Explode fiber-optic conduits outward
      for (let i = 0; i < conduitMeshes.length; i++) {
        const cm = conduitMeshes[i];
        cm.position.set(
          cm.userData.dirX * exp * 0.45,
          0,
          cm.userData.dirZ * exp * 0.45
        );
      }

      // Orbit and highlight the 8 Project Satellites
      for (let i = 0; i < satelliteNodes.length; i++) {
        const node = satelliteNodes[i];
        const angle = node.userData.baseAngle + elapsed * 0.18;
        const r = node.userData.baseRadius + exp * 0.85;
        const y = node.userData.baseY * (1 + exp * 0.5) + Math.sin(elapsed * 1.5 + i) * 0.06;

        node.position.set(Math.cos(angle) * r, y, Math.sin(angle) * r);
        node.rotation.y = -angle;

        const isSelected = st.activeNodeIndex === i;
        const targetScale = isSelected ? 1.38 : 1.0;
        node.scale.setScalar(THREE.MathUtils.damp(node.scale.x, targetScale, 8, dt));
      }

      synapticInstanced.rotation.y = elapsed * 0.08;
      const latticeScale = 1 + exp * 0.35;
      synapticInstanced.scale.setScalar(latticeScale);

      // Smooth Camera Preset Damping
      if (st.transitioningCamera) {
        if (st.cameraPreset === 'isometric') {
          _camTargetPos.set(4.8, 3.3, 6.2);
          _camLookTarget.set(0, 1.45, 0);
        } else if (st.cameraPreset === 'macro') {
          _camTargetPos.set(2.3, 2.0, 2.9);
          _camLookTarget.set(0, 1.65, 0);
        } else if (st.cameraPreset === 'top') {
          _camTargetPos.set(0.01, 7.8, 1.8);
          _camLookTarget.set(0, 1.2, 0);
        } else {
          _camTargetPos.set(6.4, 1.55, 0.0);
          _camLookTarget.set(0, 1.55, 0);
        }

        const alpha = 1 - Math.exp(-5 * dt);
        camera.position.lerp(_camTargetPos, alpha);
        controls.target.lerp(_camLookTarget, alpha);

        if (_tempVec3.copy(camera.position).distanceTo(_camTargetPos) < 0.04) {
          st.transitioningCamera = false;
        }
      }

      if (!isSoftwareGl) {
        controls.update();
      } else {
        camera.lookAt(controls.target);
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', handleResize);
      controls.removeEventListener('start', handleControlStart);
      renderer.domElement.removeEventListener('pointermove', handlePointerMove);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      controls.dispose();
      dialTexture.dispose();
      shadowTexture.dispose();
      envTarget.dispose();
      renderer.dispose();
    };
  }, []);

  if (webglFallback) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#060B16] via-[#0B1325] to-[#111C33] p-8 text-center">
        <div className="max-w-md space-y-3">
          <p className="font-mono text-xs text-cyan-400">3D NEURAL CORE · STATIC FALLBACK</p>
          <h3 className="text-xl font-semibold text-white">
            Interactive Engineering Architecture
          </h3>
          <p className="text-sm text-slate-400">
            Hardware WebGL acceleration is currently paused on this device. Explore all projects,
            live GitHub repositories, and technical documentation below.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={canvasMountRef}
      className="w-full h-full select-none overflow-hidden"
      aria-label="Interactive 3D Neural Core and Engineering Showcase"
    />
  );
};
