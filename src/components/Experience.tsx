import { OrbitControls } from "@react-three/drei";
import { Physics, Debug } from "@react-three/rapier";
import { Suspense } from "react";
import Hub from "./Hub";
import Player from "./Player";

const Experience = () => {
  return (
    <>
      <OrbitControls makeDefault />
      <Suspense>
        <Physics>
          <Debug />
          <Player />
          <Hub />
        </Physics>
      </Suspense>
    </>
  );
};

export default Experience;
