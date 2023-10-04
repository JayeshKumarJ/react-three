import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useDispatch, useSelector } from "react-redux";
import {
  EffectComposer,
  Outline,
  Select,
  Selection,
} from "@react-three/postprocessing";

const Modal = function ({ object }) {
  const model = useLoader(GLTFLoader, object.url);
  console.log(model, "here");
  return (
    <>
      <Selection>
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline
            blur
            visibleEdgeColor="yellow"
            edgeStrength={100}
            width={2500}
          />
        </EffectComposer>
        <Select enabled={true}>
          <group onClick={()=>{console.log("clicked")}}>
            <primitive object={model?.scene} scale={0.02} />
          </group>
        </Select>
      </Selection>
    </>
  );
};
export default Modal;
