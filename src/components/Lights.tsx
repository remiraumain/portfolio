import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Lights = () => {
  const light = useRef<THREE.DirectionalLight>(null!);
  useFrame((state) => {
    light.current?.position.set(
      state.camera.position.x,
      state.camera.position.y,
      state.camera.position.z
    );
    light.current?.target?.position.set(
      state.camera.position.x + state.camera.rotation.x,
      state.camera.position.y + state.camera.rotation.y,
      state.camera.position.z + state.camera.rotation.z
    );
  });

  return (
    <>
      <directionalLight
        castShadow
        position={[4, 4, 1]}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <ambientLight intensity={0.5} />
    </>
  );
};

export default Lights;
