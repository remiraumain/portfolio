import { OrbitControls } from "@react-three/drei";
import { Physics, Debug } from "@react-three/rapier";
import { Suspense } from "react";
import Hub from "./Hub";
import Player from "./Player";
import Lights from "./Lights";

const Experience = () => {
  return (
    <>
      <OrbitControls makeDefault />
      <Suspense>
        <Physics>
          {/* <Debug /> */}
          <Lights />
          <Player />
          <Hub />
        </Physics>
      </Suspense>
    </>
  );
};

export default Experience;
