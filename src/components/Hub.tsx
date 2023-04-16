import { useGLTF } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import { CylinderGeometry } from "three";
import * as THREE from "three";

const cylinderGeometry = new CylinderGeometry(10, 10, 0.5, 32);
const planeGeometry = new THREE.BoxGeometry(2, 1, 0.1);
const defaultMaterial = new THREE.MeshStandardMaterial({
  color: "lightgrey",
});
const testMaterial = new THREE.MeshStandardMaterial({
  color: "limegreen",
});

const Screen = ({ position = [0, 0, 0] as Vector3 }) => {
  const materialProps = useControls({
    thickness: { value: 0.5, min: 0, max: 20 },
    roughness: { value: 0.5, min: 0, max: 1, step: 0.1 },
    clearcoat: { value: 1, min: 0, max: 1, step: 0.1 },
    clearcoatRoughness: { value: 1, min: 0, max: 1, step: 0.1 },
    transmission: { value: 0.95, min: 0.9, max: 1, step: 0.01 },
    ior: { value: 1.25, min: 1, max: 2.3, step: 0.05 },
    envMapIntensity: { value: 25, min: 0, max: 100, step: 1 },
    color: "#bee9ff",
    attenuationTint: "#ffe79e",
    attenuationDistance: { value: 0.15, min: 0, max: 1 },
  });
  return (
    <group position={position}>
      <RigidBody type="fixed">
        <mesh geometry={planeGeometry} position={[0, 1.65, 0]}>
          <meshPhysicalMaterial {...materialProps} />
        </mesh>
      </RigidBody>
    </group>
  );
};

const Desk = ({ position = [0, 0, 0] as Vector3 }) => {
  const deskGeometry = useGLTF("/models/desk.glb");
  deskGeometry.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.material = testMaterial;
    }
  });
  return (
    <group position={position} rotation={[0, -Math.PI / 2, 0]}>
      <RigidBody type="fixed" colliders={"hull"}>
        <primitive
          object={deskGeometry.scene}
          scale={[0.2, 0.2, 0.2]}
          position={[0, 0.55, 0]}
        />
      </RigidBody>
    </group>
  );
};

const Platform = ({ position = [0, 0, 0] as Vector3 }) => {
  return (
    <group position={position}>
      <RigidBody type="fixed">
        <mesh
          geometry={cylinderGeometry}
          receiveShadow
          material={defaultMaterial}
        />
      </RigidBody>
    </group>
  );
};

// USE BLENDER TO MAKE A MODEL
// const Desk = ({ position = [0, 0, 0] as Vector3 }) => {
//   return <group position={position}></group>;
// };

const Hub = () => {
  return (
    <>
      <group position={[0, 0, -4]}>
        <Screen position={[0, 0, 0]} />
        <Desk position={[0, 0, 0]} />
      </group>
      <Platform position={[0, 0, 0]} />
    </>
  );
};

export default Hub;
