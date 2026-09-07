import { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';
import { VIIRS_SATELLITES, MODIS_NOTE } from '../../data/satelliteData';

// ── Single satellite with orbit ─────────────────────────────────────────────
function Satellite({ data, onSelect, selected, showOrbit }) {
  const groupRef = useRef();
  const orbitRef = useRef();
  const angle = useRef(data.orbitPhase);

  useFrame((_, delta) => {
    angle.current += delta * data.orbitSpeed;
    const r = data.orbitRadius;
    const inc = (data.orbitInclination * Math.PI) / 180;
    const x = r * Math.cos(angle.current);
    const z = r * Math.sin(angle.current) * Math.cos(inc);
    const y = r * Math.sin(angle.current) * Math.sin(inc) * 0.3;
    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
    }
  });

  // Build orbit ring geometry
  const orbitPoints = useMemo(() => {
    const pts = [];
    const r = data.orbitRadius;
    const inc = (data.orbitInclination * Math.PI) / 180;
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(
        new THREE.Vector3(
          r * Math.cos(a),
          r * Math.sin(a) * Math.sin(inc) * 0.3,
          r * Math.sin(a) * Math.cos(inc)
        )
      );
    }
    return pts;
  }, [data.orbitRadius, data.orbitInclination]);

  const orbitColor = new THREE.Color(data.color);

  return (
    <>
      {/* Orbit ring */}
      {showOrbit && (
        <line>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={orbitPoints.length}
              array={new Float32Array(orbitPoints.flatMap((p) => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={data.color} transparent opacity={0.2} />
        </line>
      )}

      {/* Satellite body */}
      <group ref={groupRef}>
        <mesh
          onClick={(e) => { e.stopPropagation(); onSelect(data.id); }}
          onPointerOver={() => document.body.style.cursor = 'pointer'}
          onPointerOut={() => document.body.style.cursor = 'auto'}
        >
          <boxGeometry args={[0.06, 0.02, 0.1]} />
          <meshStandardMaterial
            color={data.color}
            emissive={data.color}
            emissiveIntensity={selected ? 1.5 : 0.8}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        {/* Solar panels */}
        <mesh position={[0.12, 0, 0]}>
          <boxGeometry args={[0.08, 0.005, 0.06]} />
          <meshStandardMaterial color="#1a2a4a" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[-0.12, 0, 0]}>
          <boxGeometry args={[0.08, 0.005, 0.06]} />
          <meshStandardMaterial color="#1a2a4a" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Glow point */}
        <pointLight color={data.color} intensity={selected ? 1.5 : 0.5} distance={1} />
      </group>
    </>
  );
}

// ── Scan beam cone ──────────────────────────────────────────────────────────
function ScanBeam({ active }) {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.material.opacity = active
        ? 0.06 + Math.sin(clock.elapsedTime * 2) * 0.03
        : 0;
    }
  });
  return (
    <mesh ref={meshRef} position={[0, 1.5, 0]} rotation={[0, 0, Math.PI]}>
      <coneGeometry args={[1.1, 3, 32, 1, true]} />
      <meshBasicMaterial color="#60a5fa" transparent opacity={0.06} side={THREE.DoubleSide} />
    </mesh>
  );
}

// ── Main satellite scene exports ─────────────────────────────────────────────
export function SatelliteSystem({ sceneIndex, selectedSat, onSelectSat }) {
  const showOrbit = sceneIndex >= 1;
  const showBeam = sceneIndex === 1 || sceneIndex === 2;

  return (
    <>
      {VIIRS_SATELLITES.map((sat) => (
        <Satellite
          key={sat.id}
          data={sat}
          onSelect={onSelectSat}
          selected={selectedSat === sat.id}
          showOrbit={showOrbit}
        />
      ))}
      <ScanBeam active={showBeam} />
    </>
  );
}
