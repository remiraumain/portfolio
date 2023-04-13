import { Vector3 } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { CylinderGeometry } from "three";
import * as THREE from "three";

const cylinderGeometry = new CylinderGeometry(10, 10, 0.5, 32);
const defaultMaterial = new THREE.MeshStandardMaterial({
  color: "lightgrey",
});

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
      <Platform position={[0, 0, 0]} />
    </>
  );
};

export default Hub;
