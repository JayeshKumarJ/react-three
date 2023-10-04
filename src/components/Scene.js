import {
  Environment,
  Lightformer,
  OrbitControls,
  TransformControls,
} from "@react-three/drei";
// import Component from "./box";
import { useSelector } from "react-redux";
import { useThree } from "@react-three/fiber";
import { forwardRef, useRef } from "react";
import Meshes from "./mesh";
import Models from "./model";

const Scene = forwardRef(function Component(props, ref) {
  const mode = useSelector((state) => state.mode);
  const selectedComponent = useSelector((state) => state.selectedComponent);
  const { scene } = useThree();
  console.log("tipan");

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight color="#fffffff" position={[1, 1, 1]} />
      <Meshes ref={ref} />
      <Models />
      <OrbitControls makeDefault />
      <TransformControls
        mode={mode}
        object={scene?.getObjectById(selectedComponent?.sceneObj?.id)}
        showX={selectedComponent?.sceneObj ? true : false}
        showY={selectedComponent?.sceneObj ? true : false}
        showZ={selectedComponent?.sceneObj ? true : false}
        position={selectedComponent?.addedObj?.position}
      ></TransformControls>
      <Environment
        background
        // preset="sunset"
        files="./environmentMaps/the_sky_is_on_fire_2k.hdr"
        ground={{
          height: 7,
          radius: 28,
          scale: 100,
        }}
      >
        <Lightformer
          position-z={-5}
          scale={3}
          color="red"
          intensity={10}
          form="ring"
        />
      </Environment>
    </>
  );
});

export default Scene;
