/**
 * Cinematic 3D Cosmic World for Dikpal & Jili's Anniversary
 * Built with Three.js, studio PBR lighting, procedural textures,
 * composite celestial models, and smooth scroll synchronization.
 */

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { MEMORIES, MemoryItem } from '../data/memories';
import {
  createStarTexture,
  createPlanetSurfaceTexture,
  createRingTexture,
  createMemoryFallbackTexture,
} from '../utils/proceduralTextures';

interface CosmicCanvasProps {
  scrollProgress: number; // 0.0 to 1.0
  onSelectMemory: (memory: MemoryItem) => void;
  reducedMotion?: boolean;
}

export const CosmicCanvas: React.FC<CosmicCanvasProps> = ({
  scrollProgress,
  onSelectMemory,
  reducedMotion = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<number>(scrollProgress);
  scrollRef.current = scrollProgress;

  const onSelectMemoryRef = useRef(onSelectMemory);
  onSelectMemoryRef.current = onSelectMemory;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect software WebGL to balance performance
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070a1a);
    scene.fog = new THREE.FogExp2(0x070a1a, 0.014);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1200
    );
    camera.position.set(0, 0, 85);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    // 2. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x241d3b, 1.2);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xb4c6ff, 0x1b132f, 1.6);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff3db, 3.2);
    keyLight.position.set(40, 60, 50);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xa688fa, 4.0, 150);
    rimLight.position.set(-50, -20, -30);
    scene.add(rimLight);

    const starTexture = createStarTexture();

    // 3. Deep Background Star Field (3,000 background stars)
    const starCount = isSoftwareGl ? 1500 : 3200;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const palette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0xffeacc),
      new THREE.Color(0xd2c4ff),
      new THREE.Color(0xaed4ff),
    ];

    for (let i = 0; i < starCount; i++) {
      const radius = 180 + Math.random() * 350;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      starColors[i * 3] = color.r;
      starColors[i * 3 + 1] = color.g;
      starColors[i * 3 + 2] = color.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 2.2,
      map: starTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // 4. Spiral Forming Galaxy (Chapter 2 & beyond)
    const galaxyGroup = new THREE.Group();
    const galaxyStarCount = isSoftwareGl ? 2000 : 4500;
    const galaxyGeo = new THREE.BufferGeometry();
    const galaxyPos = new Float32Array(galaxyStarCount * 3);
    const galaxyCols = new Float32Array(galaxyStarCount * 3);

    const innerColor = new THREE.Color(0xfff1cf); // Warm starlight core
    const midColor = new THREE.Color(0xa78bfa);   // Violet nebula
    const outerColor = new THREE.Color(0x38bdf8); // Cyan starlight perimeter

    for (let i = 0; i < galaxyStarCount; i++) {
      const i3 = i * 3;
      const radius = Math.pow(Math.random(), 1.4) * 45;
      const spinAngle = radius * 0.45;
      const branchAngle = ((i % 3) * (Math.PI * 2)) / 3;

      const randomX = (Math.pow(Math.random(), 2) - 0.5) * 4;
      const randomY = (Math.pow(Math.random(), 2) - 0.5) * 4;
      const randomZ = (Math.pow(Math.random(), 2) - 0.5) * 4;

      galaxyPos[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      galaxyPos[i3 + 1] = randomY * (1.2 - radius / 45);
      galaxyPos[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = radius < 12
        ? innerColor.clone().lerp(midColor, radius / 12)
        : midColor.clone().lerp(outerColor, (radius - 12) / 33);

      galaxyCols[i3] = mixedColor.r;
      galaxyCols[i3 + 1] = mixedColor.g;
      galaxyCols[i3 + 2] = mixedColor.b;
    }

    galaxyGeo.setAttribute('position', new THREE.BufferAttribute(galaxyPos, 3));
    galaxyGeo.setAttribute('color', new THREE.BufferAttribute(galaxyCols, 3));

    const galaxyMat = new THREE.PointsMaterial({
      size: 2.8,
      map: starTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.1,
    });
    const galaxyPoints = new THREE.Points(galaxyGeo, galaxyMat);
    galaxyGroup.add(galaxyPoints);
    galaxyGroup.position.set(0, -6, 0);
    galaxyGroup.rotation.x = Math.PI * 0.28;
    scene.add(galaxyGroup);

    // 5. Chapter 1 & 2 & 3: Proposal Dancing Stars (Two points of light)
    const starPairGroup = new THREE.Group();
    const dikpalStarGeo = new THREE.SphereGeometry(0.7, 24, 24);
    const dikpalStarMat = new THREE.MeshBasicMaterial({ color: 0x93c5fd });
    const dikpalStar = new THREE.Mesh(dikpalStarGeo, dikpalStarMat);

    const jiliStarGeo = new THREE.SphereGeometry(0.7, 24, 24);
    const jiliStarMat = new THREE.MeshBasicMaterial({ color: 0xf472b6 });
    const jiliStar = new THREE.Mesh(jiliStarGeo, jiliStarMat);

    // Glow halos for both stars
    const haloGeo = new THREE.PlaneGeometry(5, 5);
    const haloMatA = new THREE.MeshBasicMaterial({
      map: starTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0x60a5fa,
      opacity: 0.8,
    });
    const haloA = new THREE.Mesh(haloGeo, haloMatA);
    dikpalStar.add(haloA);

    const haloMatB = new THREE.MeshBasicMaterial({
      map: starTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xf472b6,
      opacity: 0.8,
    });
    const haloB = new THREE.Mesh(haloGeo, haloMatB);
    jiliStar.add(haloB);

    starPairGroup.add(dikpalStar);
    starPairGroup.add(jiliStar);
    scene.add(starPairGroup);

    // Connection line between them
    const pairLineMat = new THREE.LineBasicMaterial({
      color: 0xffe4e6,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
    });
    const pairLineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
    ]);
    const pairLine = new THREE.Line(pairLineGeo, pairLineMat);
    scene.add(pairLine);

    // 6. Composite 5-Part Memory Planet (Chapters 3-9)
    // Multi-part procedural model: Core sphere, bump surface, atmosphere glow, concentric ring, orbiting moons
    const planetGroup = new THREE.Group();

    // Part 1: Core planet sphere with procedural texture
    const planetTexture = createPlanetSurfaceTexture();
    const planetCoreGeo = new THREE.SphereGeometry(7.2, 48, 48);
    const planetCoreMat = new THREE.MeshStandardMaterial({
      map: planetTexture,
      roughness: 0.75,
      metalness: 0.15,
      bumpScale: 0.15,
    });
    const planetMesh = new THREE.Mesh(planetCoreGeo, planetCoreMat);
    planetGroup.add(planetMesh);

    // Part 2: Soft atmospheric glow shell
    const atmosphereGeo = new THREE.SphereGeometry(7.6, 32, 32);
    const atmosphereMat = new THREE.MeshStandardMaterial({
      color: 0xc4b5fd,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      roughness: 0.9,
      metalness: 0.1,
      depthWrite: false,
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    planetGroup.add(atmosphereMesh);

    // Part 3: Concentric Planetary Ring
    const ringTexture = createRingTexture();
    const ringGeo = new THREE.RingGeometry(10.5, 17.5, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      map: ringTexture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
      roughness: 0.6,
      metalness: 0.2,
      depthWrite: false,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI * 0.42;
    ringMesh.rotation.y = Math.PI * 0.1;
    planetGroup.add(ringMesh);

    // Part 4 & 5: Two small orbiting celestial moons
    const moon1Geo = new THREE.SphereGeometry(0.8, 16, 16);
    const moon1Mat = new THREE.MeshStandardMaterial({
      color: 0xfde68a,
      roughness: 0.5,
      metalness: 0.3,
    });
    const moon1 = new THREE.Mesh(moon1Geo, moon1Mat);
    moon1.position.set(22, 4, 0);
    planetGroup.add(moon1);

    const moon2Geo = new THREE.SphereGeometry(0.55, 16, 16);
    const moon2Mat = new THREE.MeshStandardMaterial({
      color: 0x99f6e4,
      roughness: 0.6,
      metalness: 0.2,
    });
    const moon2 = new THREE.Mesh(moon2Geo, moon2Mat);
    moon2.position.set(-25, -6, 5);
    planetGroup.add(moon2);

    planetGroup.position.set(0, 0, 0);
    planetGroup.scale.set(0.01, 0.01, 0.01);
    scene.add(planetGroup);

    // 7. Floating Orbital Photograph Frames (Memories)
    const memoryMeshes: {
      mesh: THREE.Group;
      memory: MemoryItem;
      baseAngle: number;
      orbitRadius: number;
      orbitSpeed: number;
      yOffset: number;
    }[] = [];

    const textureLoader = new THREE.TextureLoader();

    MEMORIES.forEach((item, index) => {
      const frameGroup = new THREE.Group();
      frameGroup.userData = { memory: item };

      // Generate fallback procedural texture immediately
      const fallbackTex = createMemoryFallbackTexture(
        item.title,
        item.date,
        item.motif,
        item.themeColor,
        item.accentColor
      );

      // Attempt to load the real photo; if present, smoothly replace texture
      textureLoader.load(
        item.imagePath,
        (loadedTex) => {
          loadedTex.colorSpace = THREE.SRGBColorSpace;
          photoMat.map = loadedTex;
          photoMat.needsUpdate = true;
        },
        undefined,
        () => {
          // Graceful fallback: Keep the procedural canvas texture
        }
      );

      // Photo surface geometry
      const width = 3.6;
      const height = width / item.aspectRatio;
      const photoGeo = new THREE.PlaneGeometry(width, height);
      const photoMat = new THREE.MeshBasicMaterial({
        map: fallbackTex,
        side: THREE.DoubleSide,
      });
      const photoMesh = new THREE.Mesh(photoGeo, photoMat);
      frameGroup.add(photoMesh);

      // Luminous Glass-Metallic Bezel Frame
      const frameThickness = 0.15;
      const bezelGeo = new THREE.BoxGeometry(width + 0.35, height + 0.35, frameThickness);
      const bezelMat = new THREE.MeshStandardMaterial({
        color: 0x181e3a,
        metalness: 0.85,
        roughness: 0.25,
      });
      const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
      bezelMesh.position.z = -0.09;
      frameGroup.add(bezelMesh);

      // Ambient Starlight Halo around frame
      const auraGeo = new THREE.PlaneGeometry(width + 2.5, height + 2.5);
      const auraMat = new THREE.MeshBasicMaterial({
        map: starTexture,
        transparent: true,
        opacity: 0.55,
        color: new THREE.Color(item.themeColor),
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const auraMesh = new THREE.Mesh(auraGeo, auraMat);
      auraMesh.position.z = -0.12;
      frameGroup.add(auraMesh);

      // Orbital parameters
      const baseAngle = (index / MEMORIES.length) * Math.PI * 2;
      const orbitRadius = 18.5 + (index % 3) * 3.5;
      const yOffset = Math.sin(index * 1.5) * 4.5;
      const orbitSpeed = 0.08 + (index % 2) * 0.04;

      frameGroup.scale.set(0.001, 0.001, 0.001);
      scene.add(frameGroup);

      memoryMeshes.push({
        mesh: frameGroup,
        memory: item,
        baseAngle,
        orbitRadius,
        orbitSpeed,
        yOffset,
      });
    });

    // 8. Constellation System (Chapter 6 & 8)
    const constellationGroup = new THREE.Group();
    const constellationMat = new THREE.LineBasicMaterial({
      color: 0xf5d0fe,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      linewidth: 1.5,
    });

    const constPoints: THREE.Vector3[] = [];
    const constStarMeshes: THREE.Mesh[] = [];

    // Constellation nodes
    for (let c = 0; c < 12; c++) {
      const angle = (c / 12) * Math.PI * 2;
      const r = 24 + Math.sin(c * 2) * 6;
      const pt = new THREE.Vector3(
        Math.cos(angle) * r,
        Math.sin(c * 3) * 7,
        Math.sin(angle) * r
      );
      constPoints.push(pt);

      const nodeStarGeo = new THREE.SphereGeometry(0.35, 12, 12);
      const nodeStarMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const nodeMesh = new THREE.Mesh(nodeStarGeo, nodeStarMat);
      nodeMesh.position.copy(pt);
      constellationGroup.add(nodeMesh);
      constStarMeshes.push(nodeMesh);
    }

    // Connect lines sequentially and cross-connect
    const lineIndices: number[] = [];
    for (let c = 0; c < constPoints.length; c++) {
      lineIndices.push(c);
      lineIndices.push((c + 1) % constPoints.length);
      if (c % 3 === 0) {
        lineIndices.push(c);
        lineIndices.push((c + 5) % constPoints.length);
      }
    }

    const constLineGeo = new THREE.BufferGeometry().setFromPoints(constPoints);
    constLineGeo.setIndex(lineIndices);
    const constellationLines = new THREE.LineSegments(constLineGeo, constellationMat);
    constellationGroup.add(constellationLines);
    scene.add(constellationGroup);

    // 9. Interactive Raycasting for memory inspection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredMesh: THREE.Group | null = null;

    const handlePointerMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        memoryMeshes.map((m) => m.mesh),
        true
      );

      if (intersects.length > 0) {
        let rootGroup: THREE.Object3D | null = intersects[0].object;
        while (rootGroup && rootGroup.parent && rootGroup.parent !== scene) {
          rootGroup = rootGroup.parent;
        }
        if (rootGroup && rootGroup.userData?.memory) {
          hoveredMesh = rootGroup as THREE.Group;
          renderer.domElement.style.cursor = 'pointer';
          return;
        }
      }
      hoveredMesh = null;
      renderer.domElement.style.cursor = 'default';
    };

    const handleClick = () => {
      if (hoveredMesh && hoveredMesh.userData?.memory) {
        onSelectMemoryRef.current(hoveredMesh.userData.memory);
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('click', handleClick);

    // 10. Smooth Render & Animation Loop
    let animationFrameId = 0;
    const clock = new THREE.Clock();

    const scratchCamPos = new THREE.Vector3();
    const scratchCamTarget = new THREE.Vector3();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      const p = scrollRef.current; // 0.0 to 1.0

      // Rotate background stars slowly
      starPoints.rotation.y = elapsed * 0.015;

      // Chapter-specific choreography
      // Chapter 1: 0.0 - 0.12 (Dark void, single star brightening)
      // Chapter 2: 0.12 - 0.25 (Galaxy emerges, two lights curve together)
      // Chapter 3: 0.25 - 0.38 (1 AM proposal: lights unite, planet is born)
      // Chapter 4: 0.38 - 0.52 (Two years of little universes: memories orbit planet)
      // Chapter 5: 0.52 - 0.65 (Gratitude, calm intimate space)
      // Chapter 6: 0.65 - 0.76 (Every star is a reason: constellation ignites)
      // Chapter 7: 0.76 - 0.86 (A universe still waiting for us: horizon opens)
      // Chapter 8: 0.86 - 0.94 (The grand reveal: Dikpal & Jili)
      // Chapter 9: 0.94 - 1.00 (Letter to Munchkin)

      // Galaxy formation & opacity
      const galaxyOpacity = p < 0.08 ? 0.05 : Math.min(0.9, (p - 0.08) * 3.5);
      galaxyMat.opacity = galaxyOpacity;
      galaxyPoints.rotation.y = elapsed * 0.04 + p * Math.PI * 4;

      // Dancing proposal stars (Dikpal & Jili)
      if (p < 0.42) {
        starPairGroup.visible = true;
        const orbitP = Math.min(1.0, p / 0.32);
        // They start apart and gradually spiral toward union around 0.30 (1:00 AM)
        const spread = (1 - orbitP) * 16 + 0.3;
        const angleA = elapsed * 1.2 + p * 8;
        const angleB = angleA + Math.PI * (1 - orbitP * 0.95);

        dikpalStar.position.set(
          Math.cos(angleA) * spread,
          Math.sin(angleA * 0.8) * (spread * 0.5),
          Math.sin(angleA) * spread
        );

        jiliStar.position.set(
          Math.cos(angleB) * spread,
          Math.sin(angleB * 0.8) * (spread * 0.5),
          Math.sin(angleB) * spread
        );

        // Connection line illuminates as they approach
        const linePos = pairLine.geometry.attributes.position;
        linePos.setXYZ(0, dikpalStar.position.x, dikpalStar.position.y, dikpalStar.position.z);
        linePos.setXYZ(1, jiliStar.position.x, jiliStar.position.y, jiliStar.position.z);
        linePos.needsUpdate = true;
        pairLineMat.opacity = Math.max(0, (orbitP - 0.2) * 1.5);
      } else {
        starPairGroup.visible = false;
        pairLineMat.opacity = 0;
      }

      // Memory Planet emerge and spin
      if (p >= 0.28) {
        const planetScaleProgress = Math.min(1.0, (p - 0.28) * 5.0);
        const targetScale = 0.95 * planetScaleProgress;
        planetGroup.scale.set(targetScale, targetScale, targetScale);
        planetMesh.rotation.y = elapsed * 0.08 + p * 2.0;
        ringMesh.rotation.z = elapsed * 0.03;

        // Orbiting moons
        moon1.position.x = Math.cos(elapsed * 0.6) * 20;
        moon1.position.z = Math.sin(elapsed * 0.6) * 20;
        moon2.position.x = Math.cos(elapsed * -0.4 + 2) * 24;
        moon2.position.z = Math.sin(elapsed * -0.4 + 2) * 24;
      } else {
        planetGroup.scale.set(0.001, 0.001, 0.001);
      }

      // Orbiting Memory Frames
      memoryMeshes.forEach((item, idx) => {
        const appearsAt = 0.34;
        if (p >= appearsAt) {
          const entryP = Math.min(1.0, (p - appearsAt) * 4.0);
          const currentAngle = item.baseAngle + elapsed * item.orbitSpeed + p * 3.0;
          const radius = item.orbitRadius * (0.85 + Math.sin(elapsed * 0.5 + idx) * 0.05);

          const targetX = Math.cos(currentAngle) * radius;
          const targetZ = Math.sin(currentAngle) * radius;
          const targetY = item.yOffset + Math.sin(elapsed + idx) * 1.2;

          item.mesh.position.set(targetX, targetY, targetZ);

          // Face the camera or face planet center
          item.mesh.lookAt(camera.position);

          const isHovered = hoveredMesh === item.mesh;
          const hoverScale = isHovered ? 1.25 : 1.0;
          const baseScale = entryP * hoverScale;
          item.mesh.scale.set(baseScale, baseScale, baseScale);
        } else {
          item.mesh.scale.set(0.001, 0.001, 0.001);
        }
      });

      // Constellation glow & alignment
      if (p >= 0.58) {
        const constAlpha = Math.min(0.9, (p - 0.58) * 3.0);
        constellationMat.opacity = constAlpha;
        constellationGroup.rotation.y = elapsed * 0.05 + p;
        constStarMeshes.forEach((starMesh, idx) => {
          const pulse = 1 + Math.sin(elapsed * 3 + idx) * 0.3;
          starMesh.scale.set(pulse, pulse, pulse);
        });
      } else {
        constellationMat.opacity = 0;
      }

      // Camera Path Choreography across all 9 chapters
      if (!reducedMotion) {
        if (p < 0.14) {
          // Chapter 1: Deep void looking forward
          const localP = p / 0.14;
          scratchCamPos.set(0, 0, 85 - localP * 15);
          scratchCamTarget.set(0, 0, 0);
        } else if (p < 0.28) {
          // Chapter 2: Approaching galaxy plane
          const localP = (p - 0.14) / 0.14;
          scratchCamPos.set(
            Math.sin(localP * 0.8) * 15,
            12 - localP * 6,
            70 - localP * 25
          );
          scratchCamTarget.set(0, -2, 0);
        } else if (p < 0.42) {
          // Chapter 3: 1 AM proposal union - camera sweeps in close
          const localP = (p - 0.28) / 0.14;
          scratchCamPos.set(
            Math.cos(localP * 2.2) * 28,
            6 + Math.sin(localP * 2.0) * 4,
            38 - localP * 10
          );
          scratchCamTarget.set(0, 0, 0);
        } else if (p < 0.58) {
          // Chapter 4: Orbiting the memory planet
          const localP = (p - 0.42) / 0.16;
          scratchCamPos.set(
            Math.sin(localP * Math.PI) * 32,
            8 + Math.cos(localP * Math.PI) * 4,
            32 + Math.sin(localP * 2) * 6
          );
          scratchCamTarget.set(0, 0, 0);
        } else if (p < 0.72) {
          // Chapter 5: Intimate gratitude space
          const localP = (p - 0.58) / 0.14;
          scratchCamPos.set(
            -18 + localP * 8,
            4 - localP * 2,
            36 + localP * 8
          );
          scratchCamTarget.set(0, 0, 0);
        } else if (p < 0.84) {
          // Chapter 6 & 7: Pulling back to see the constellation & future horizon
          const localP = (p - 0.72) / 0.12;
          scratchCamPos.set(
            Math.cos(localP * 1.5) * 42,
            14 + localP * 6,
            55 + localP * 15
          );
          scratchCamTarget.set(0, 2, 0);
        } else {
          // Chapter 8 & 9: Grand anniversary reveal & heartfelt letter
          const localP = (p - 0.84) / 0.16;
          scratchCamPos.set(0, 10 + localP * 4, 68 + localP * 10);
          scratchCamTarget.set(0, -2, 0);
        }

        // Exponential camera damping
        camera.position.lerp(scratchCamPos, 0.08);
        camera.lookAt(scratchCamTarget);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);

      // Clean disposal
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
      galaxyGeo.dispose();
      galaxyMat.dispose();
      planetCoreGeo.dispose();
      planetCoreMat.dispose();
      atmosphereGeo.dispose();
      atmosphereMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 0 }}
      data-testid="cosmic-canvas-container"
    />
  );
};
