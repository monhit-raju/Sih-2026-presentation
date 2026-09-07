import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// ── Camera positions per scene ──────────────────────────────────────────────
const CAMERA_CONFIGS = [
  { position: [0, 0, 3.5], target: [0, 0, 0] },   // 0: Opening
  { position: [0, 1.5, 6.5], target: [0, 0, 0] },  // 1: Satellites
  { position: [0.3, 0.1, 2.0], target: [0.2, 0, 0] }, // 2: FIRMS
  { position: [0.5, -0.1, 2.2], target: [0.3, 0, 0] }, // 3: Land Cover
  { position: [0.4, -0.2, 2.4], target: [0.2, -0.1, 0] }, // 4: Industrial
  { position: [0, 0.5, 3.5], target: [0, 0.2, 0] }, // 5: Temporal
  { position: [0, 0, 4.0], target: [0, 0, 0] },     // 6: Features
  { position: [0, 0, 4.5], target: [0, 0, 0] },     // 7: Rules
  { position: [0, 0, 5.0], target: [0, 0, 0] },     // 8: AI
  { position: [0, 0, 3.2], target: [0, 0, 0] },     // 9: Results
  { position: [0, 1.0, 5.5], target: [0, 0.2, 0] }, // 10: Pipeline
  { position: [0, 0, 3.8], target: [0, 0, 0] },     // 11: Dashboard
];

// ── Hotspot markers on Earth surface ────────────────────────────────────────
const HOTSPOTS = [
  { lat: 37.0, lon: -120.5, label: 'WILDFIRE', color: '#ef4444' },
  { lat: 32.0, lon: -97.3, label: 'INDUSTRIAL', color: '#f97316' },
  { lat: 40.5, lon: -80.0, label: 'INDUSTRIAL', color: '#f97316' },
  { lat: 35.0, lon: -90.0, label: 'AGRICULTURAL', color: '#f59e0b' },
  { lat: 44.0, lon: -110.0, label: 'WILDFIRE', color: '#ef4444' },
];

function latLonToXYZ(lat, lon, radius = 1.01) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ];
}

// ── Atmosphere shader ────────────────────────────────────────────────────────
function Atmosphere() {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.material.opacity = 0.12 + Math.sin(clock.elapsedTime * 0.5) * 0.02;
    }
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.08, 64, 64]} />
      <meshBasicMaterial color="#4080ff" transparent opacity={0.12} side={THREE.BackSide} />
    </mesh>
  );
}

// ── Hotspot pulsing points ──────────────────────────────────────────────────
function HotspotMarker({ lat, lon, color, visible }) {
  const meshRef = useRef();
  const [x, y, z] = latLonToXYZ(lat, lon);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 3) * 0.4;
      meshRef.current.scale.setScalar(visible ? s : 0);
    }
  });
  return (
    <mesh ref={meshRef} position={[x, y, z]}>
      <sphereGeometry args={[0.018, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  );
}

// ── Camera controller ────────────────────────────────────────────────────────
function CameraController({ sceneIndex }) {
  const { camera } = useThree();
  useEffect(() => {
    const config = CAMERA_CONFIGS[Math.min(sceneIndex, CAMERA_CONFIGS.length - 1)];
    gsap.to(camera.position, {
      x: config.position[0],
      y: config.position[1],
      z: config.position[2],
      duration: 2.0,
      ease: 'power2.inOut',
    });
  }, [sceneIndex, camera]);
  return null;
}

// ── Main Earth Globe ─────────────────────────────────────────────────────────
export default function EarthGlobe({ sceneIndex }) {
  const earthRef = useRef();

  // Load textures from CDN (NASA Blue Marble)
  const earthTexture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load(
      'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
      undefined,
      undefined,
      () => {
        // fallback: use a generated texture if CDN fails
      }
    );
    return tex;
  }, []);

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.05;
    }
  });

  const showHotspots = sceneIndex === 0 || sceneIndex === 2 || sceneIndex >= 9;

  return (
    <>
      <CameraController sceneIndex={sceneIndex} />

      {/* Earth */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Atmosphere */}
      <Atmosphere />

      {/* Hotspot markers */}
      {HOTSPOTS.map((h, i) => (
        <HotspotMarker key={i} {...h} visible={showHotspots} />
      ))}

      {/* Ambient + directional light (sun) */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[5, 3, 5]} intensity={1.2} color="#fff5e0" />
      <pointLight position={[-10, 0, -10]} intensity={0.3} color="#1a3a6b" />
    </>
  );
}
