import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Float, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import logoModel from "./assets/logo.glb?url";
import logoBrightModel from "./assets/logobrigh.glb?url";

function collectMeshMaterials(root) {
  const mats = [];
  root.traverse((obj) => {
    if (!obj.isMesh || !obj.material) return;
    const meshMats = Array.isArray(obj.material) ? obj.material : [obj.material];
    meshMats.forEach((mat) => {
      if (!mats.includes(mat)) mats.push(mat);
    });
  });
  return mats;
}

function HeroLogoModel({ isDark }) {
  const groupRef = useRef(null);
  const modelUrl = isDark ? logoBrightModel : logoModel;
  const { scene } = useGLTF(modelUrl);

  const model = useMemo(() => scene.clone(true), [scene]);
  const materials = useMemo(() => collectMeshMaterials(model), [model]);

  useEffect(() => {
    return () => {
      model.traverse((obj) => {
        if (!obj.isMesh) return;
        obj.geometry?.dispose();
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
        mats.forEach((m) => m?.dispose());
      });
    };
  }, [model]);

  const fitScale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    return 2.6 / maxAxis;
  }, [model]);

  useEffect(() => {
    materials.forEach((mat) => {
      mat.transparent = false;
      mat.depthWrite = true;
      mat.opacity = 1;
      mat.needsUpdate = true;
      if ("color" in mat && mat.color?.set) mat.color.set(isDark ? "#ffffff" : "#000000");
      if ("emissive" in mat && mat.emissive?.set) mat.emissive.set(isDark ? "#ffffff" : "#000000");
    });
  }, [materials, isDark]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 1.2;
    groupRef.current.position.x = Math.cos(t * 0.8) * 0.08;
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <Center>
        <group scale={fitScale}>
          <primitive object={model} />
        </group>
      </Center>
    </group>
  );
}

export default function HeroScene({ isDark }) {
  const wrapperRef = useRef(null);
  const [inViewport, setInViewport] = useState(false);
  const [tabVisible, setTabVisible] = useState(!document.hidden);

  // Pause when the hero scrolls out of view
  useEffect(() => {
    if (!wrapperRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(entry.isIntersecting),
      { rootMargin: "300px" },
    );
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  // Pause when the browser tab is hidden
  useEffect(() => {
    const update = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  const frameloop = inViewport && tabVisible ? "always" : "never";

  return (
    <div ref={wrapperRef} style={{ position: "absolute", inset: 0 }}>
      <Canvas
        className="hero__model"
        frameloop={frameloop}
        camera={{ position: [0, 0, 5.5], fov: 30, near: 0.1, far: 100 }}
        dpr={1}
        performance={{ min: 0.5 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={1.25} />
        <directionalLight position={[2, 3, 3]} intensity={2.2} />
        <directionalLight position={[-2, -1, -2]} intensity={0.75} />
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.16}>
          <HeroLogoModel isDark={isDark} />
        </Float>
      </Canvas>
    </div>
  );
}
