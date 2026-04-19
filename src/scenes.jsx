import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "./siteData";

export function FloatingGroup({
  children,
  speed = 1,
  floatIntensity = 0.6,
  rotationIntensity = 0.4,
}) {
  const ref = useRef(null);

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.elapsedTime * speed;
    ref.current.position.y = Math.sin(t) * floatIntensity * 0.2;
    ref.current.rotation.x = Math.sin(t * 0.8) * rotationIntensity * 0.2;
    ref.current.rotation.y += 0.0035 * speed;
  });

  return <group ref={ref}>{children}</group>;
}

export function AmbientBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute left-[-120px] top-24 h-[320px] w-[320px] rounded-full bg-cyan-400/10 blur-[100px]" />
      <div className="absolute right-[-120px] top-[18%] h-[340px] w-[340px] rounded-full bg-violet-500/10 blur-[110px]" />
      <div className="absolute inset-x-0 bottom-0 h-[360px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_55%)]" />
    </div>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-3 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-4 py-3 text-sm font-semibold text-emerald-50 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:scale-[1.02] hover:bg-emerald-500/20"
    >
      <MessageCircle className="h-5 w-5" />
      WhatsApp
    </a>
  );
}

export function SceneCanvas({ children, camera = { position: [0, 0, 5], fov: 50 }, className }) {
  return (
    <div className={className}>
      <Canvas dpr={[1, 1.1]} gl={{ alpha: true, antialias: false, powerPreference: "low-power" }} camera={camera}>
        {children}
      </Canvas>
    </div>
  );
}

export function HeroNeuralScene() {
  const group = useRef(null);

  const { nodes, linePositions, particlePositions } = useMemo(() => {
    const generatedNodes = Array.from({ length: 18 }, (_, index) => {
      const angle = (index / 18) * Math.PI * 2;
      const radius = 1.2 + Math.sin(index * 2.2) * 0.28 + Math.random() * 0.3;
      return new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(index * 1.4) * 1,
        Math.sin(angle) * radius * 0.5,
      );
    });

    const lines = [];
    for (let i = 0; i < generatedNodes.length; i += 1) {
      for (let j = i + 1; j < generatedNodes.length; j += 1) {
        if (generatedNodes[i].distanceTo(generatedNodes[j]) < 1.2) {
          lines.push(...generatedNodes[i].toArray(), ...generatedNodes[j].toArray());
        }
      }
    }

    const particles = new Float32Array(180 * 3);
    for (let i = 0; i < 180; i += 1) {
      const radius = 2 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particles[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particles[i * 3 + 1] = radius * Math.cos(phi) * 0.65;
      particles[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    return {
      nodes: generatedNodes,
      linePositions: new Float32Array(lines),
      particlePositions: particles,
    };
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.12;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
            count={particlePositions.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.02} color="#93c5fd" transparent opacity={0.75} />
      </points>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={linePositions.length / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#67e8f9" transparent opacity={0.28} />
      </lineSegments>

      {nodes.map((point, index) => (
        <mesh key={index} position={point.toArray()}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshStandardMaterial
            color={index % 3 === 0 ? "#67e8f9" : "#c4b5fd"}
            emissive={index % 3 === 0 ? "#0891b2" : "#7c3aed"}
            emissiveIntensity={1.1}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>
      ))}

      <FloatingGroup speed={1.15} rotationIntensity={0.55} floatIntensity={0.7}>
        <mesh rotation={[0.4, 0.6, 0.1]}>
          <torusKnotGeometry args={[0.55, 0.1, 120, 18]} />
          <meshPhysicalMaterial
            color="#8b5cf6"
            roughness={0.15}
            transmission={0.2}
            thickness={0.5}
            metalness={0.65}
            clearcoat={1}
            transparent
            opacity={0.5}
          />
        </mesh>
      </FloatingGroup>
    </group>
  );
}

export function ExperienceScene() {
  const group = useRef(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!group.current) return;

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      pointer.y * 0.6 + state.clock.elapsedTime * 0.16,
      0.05,
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.x * 0.8 + state.clock.elapsedTime * 0.22,
      0.05,
    );
  });

  return (
    <group ref={group}>
      <FloatingGroup speed={1.4} rotationIntensity={0.75} floatIntensity={0.9}>
        <mesh>
          <icosahedronGeometry args={[1.02, 1]} />
          <meshPhysicalMaterial
            color="#67e8f9"
            emissive="#0f766e"
            emissiveIntensity={0.55}
            roughness={0.12}
            metalness={0.88}
            transmission={0.1}
            clearcoat={1}
          />
        </mesh>
      </FloatingGroup>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.05, 18, 72]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.55} />
      </mesh>

      <mesh rotation={[0.8, 0.4, 0.3]}>
        <torusKnotGeometry args={[0.48, 0.08, 120, 18]} />
        <meshStandardMaterial color="#c4b5fd" emissive="#7c3aed" emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
}
