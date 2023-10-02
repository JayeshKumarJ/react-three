import { OrbitControls, TransformControls } from "@react-three/drei";
import Component from "./box";
import { useSelector } from "react-redux";
import { useThree } from "@react-three/fiber";
import { useRef } from "react";

const Scene = () => {
  const mode = useSelector((state) => state.mode);
  const selectedComponent = useSelector((state) => state.selectedComponent);
  const { scene } = useThree();

  console.log("Mode", mode);
  console.log("selectedComp", selectedComponent);
  console.log("scene----", scene);
  console.log("getObject", scene?.getObjectById(selectedComponent));

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight color="0x404040" position={[1, 1, 1]} />
      <Component />
      <OrbitControls makeDefault />
      <TransformControls
        mode={mode}
        object={scene?.getObjectById(selectedComponent)}
      ></TransformControls>
    </>
  );
};

export default Scene;
