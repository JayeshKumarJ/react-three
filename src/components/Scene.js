import { OrbitControls, TransformControls } from "@react-three/drei";
// import Component from "./box";
import { useSelector } from "react-redux";
import { useThree } from "@react-three/fiber";
import { forwardRef, useRef } from "react";
import Meshes from "./mesh";

const Scene = forwardRef(function Component(props, ref) {
  const mode = useSelector((state) => state.mode);
  const selectedComponent = useSelector((state) => state.selectedComponent);
  const { scene } = useThree();

  console.log("Mode", mode);
  console.log("selectedComp", selectedComponent?.uuid);
  console.log("scene----", scene);
  console.log("getObject", scene?.getObjectById(selectedComponent?.id));

  console.log(ref, "ref")

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight color="0x404040" position={[1, 1, 1]} />
      <Meshes ref={ref} />
      <OrbitControls makeDefault />
      <TransformControls
        mode={mode}
        object={scene?.getObjectById(selectedComponent?.id)}
        showX={selectedComponent ? true :false}
        showY={selectedComponent ? true :false}
        showZ={selectedComponent ? true :false}
        position={[selectedComponent?.position]}
      ></TransformControls>
    </>
  );
});

export default Scene;
