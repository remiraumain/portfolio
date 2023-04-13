import { OrbitControls } from "@react-three/drei";
import { Physics, Debug } from "@react-three/rapier";
import { Suspense } from "react";
import Hub from "./Hub";

const Experience = () => {
  return (
    <>
      <OrbitControls makeDefault />
      <Suspense>
        <Physics>
          <Debug />
          <Hub />
        </Physics>
      </Suspense>
    </>
  );
};

export default Experience;
