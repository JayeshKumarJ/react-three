import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useDispatch, useSelector } from "react-redux";
import {
  EffectComposer,
  Outline,
  Select,
  Selection,
} from "@react-three/postprocessing";
import { setMode, setSelectedComponent, setSelectedModel } from "../Redux/editor.slice";

const Modal = function ({ object }) {
  const model = useLoader(GLTFLoader, object?.url);
  const dispatch = useDispatch();
  console.log("objectDetails:",object)
  // console.log(model, "here");
const selectedModel = useSelector((state)=>state.selectedComponent);
console.log("Selected Model",selectedModel)
console.log("condition:::",selectedModel?.sceneObj?.uuid === object.id)
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
        <Select enabled={selectedModel?.sceneObj?.uuid === object.id}>
          <group
            onClick={(e) => {
              dispatch(setMode("translate"));
              dispatch(
                setSelectedComponent({
                  sceneObj: e.eventObject,
                  addedObj: object,
                })
              );
            }}
          >
            <primitive object={model?.scene} scale={0.01} />
          </group>
        </Select>
      </Selection>
    </>
  );
};
export default Modal;
