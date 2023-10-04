import { useDispatch, useSelector } from "react-redux";
import { editText, setMode, setSelectedComponent } from "../Redux/editor.slice";
import { useThree } from "@react-three/fiber";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";
import {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  Component,
  useState,
} from "react";
import { Html, Text, Text3D } from "@react-three/drei";
import {
  EffectComposer,
  Outline,
  Select,
  Selection,
  Vignette,
} from "@react-three/postprocessing";
import Drunk from "./Drunk.js";
import { useControls } from "leva";
import { BlendFunction } from "postprocessing";
import { Physics, RigidBody } from "@react-three/rapier";
import { Perf } from 'r3f-perf'
// import { GLTFExporter } from 'three/addons/loaders/GLTFExporter';

const Meshes = forwardRef(function Component(props, ref) {
  const [text, setText] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [prevText, setPrevText] = useState("");
  const dispatch = useDispatch();
  const components = useSelector((state) => state);
  const scene = useThree((state) => state.scene);
  const drunkRef = useRef();
  console.log("box", components?.data);
  console.log(
    "selected",
    components?.selectedComponent?.sceneObj?.geometry?.uuid
  );
  console.log("Scene =>", scene);
  console.log("prevText", prevText);
  useImperativeHandle(
    ref,
    () => {
      return {
        download() {
          const exporter = new GLTFExporter();
          exporter.parse(
            scene,
            function (result) {
              // console.log("export scene", result.scene);
              if (result instanceof ArrayBuffer) {
                saveArrayBuffer(result, "scene.glb");
              }
              // downloadJSON(result)
              else {
                const output = JSON.stringify(result, null, 2);
                console.log(output);
                saveString(output, "scene.gltf");
              }
            },
            { binary: true }
          );
        },
      };
    },
    []
  );

  function saveArrayBuffer(buffer, filename) {
    save(new Blob([buffer], { type: "application/octet-stream" }), filename);
  }
  function saveString(text, filename) {
    save(new Blob([text], { type: "text/plain" }), filename);
  }

  function save(blob, filename) {
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }

  const link = document.createElement("a");
  link.style.display = "none";
  document.body.appendChild(link); // Firefox workaround, see #6594

  const drunkProps = useControls("Drunk Effect", {
    frequency: { value: 2, min: 1, max: 20 },
    amplitude: { value: 0.1, min: 0, max: 1 },
  });
  
  const { perfVisible } = useControls({
    perfVisible: true
})
const { envMapIntensity } = useControls('environment map', {
  envMapIntensity: { value: 1, min: 0, max: 12 }
})
  const handleChange = (event) => {
    // 👇 Get input value from "event"
    setText(event.target.value);
    setPrevText(event.target.value);
  };
  console.log("text", text);
  return components?.data?.map((component) => {
    console.log("component", component);
    console.log("type:::", component?.type === "plane" ? "fixed" : "dynamic");
    console.log(
      "condition",
      components?.selectedComponent?.sceneObj?.uuid === component?.id
    );
    return (
      <>
      {perfVisible && <Perf position="bottom-right"/>}
        {component?.type === "text" ? (
          <Selection>
            <EffectComposer multisampling={8} autoClear={false}>
              <Outline
                blur
                visibleEdgeColor="yellow"
                edgeStrength={100}
                width={2500}
              />
            </EffectComposer>
            <Select
              enabled={
                components?.selectedComponent?.sceneObj?.uuid === component.id
              }
            >
              {components?.selectedComponent?.sceneObj?.uuid ===
              component.id ? (
                <Html
                  // position={[-4.7, 2.9, 0]}
                  position={component.position}
                >
                  {isEdit ? (
                    <>
                      <input
                        type="text"
                        placeholder="Edit Text here"
                        id="text"
                        name="text"
                        value={prevText}
                        onChange={handleChange}
                      ></input>
                      <button
                        position={[0, 5, 0]}
                        onClick={() => {
                          dispatch(editText({ text: text, id: component.id }));
                          setIsEdit(false);
                        }}
                      >
                        Update
                      </button>
                      <button
                        position={[0, 5, 0]}
                        onClick={() => {
                          setIsEdit(false);
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      position={[0, 5, 0]}
                      onClick={() => {
                        setIsEdit(true);
                        setPrevText(component.text);
                      }}
                    >
                      Edit
                    </button>
                  )}
                </Html>
              ) : null}

              <mesh
                onClick={(e) => {
                  dispatch(
                    setSelectedComponent({
                      sceneObj: e.eventObject,
                      addedObj: component,
                    })
                  );
                }}
              >
                <Text3D font={`./${component?.font}`}>
                  {component?.text}
                  <meshNormalMaterial />
                </Text3D>

                {/* <Text
                  scale={[10, 10, 10]}
                  color="pink" // default
                  anchorX="center" // default
                  anchorY="middle" // default
                >
                  HELLO WORLD
                </Text> */}
              </mesh>
            </Select>
          </Selection>
        ) : (
          <Physics gravity={[0, -9.08, 0]}>
            <Selection>
              <EffectComposer multisampling={8} autoClear={false}>
                <Outline
                  blur
                  visibleEdgeColor="yellow"
                  edgeStrength={100}
                  width={2500}
                />
                {/* <Drunk
                    ref={drunkRef}
                    {...drunkProps}
                    blendFunction={BlendFunction.DARKEN}
                  /> */}
                {/* <Vignette/> */}
              </EffectComposer>
              <Select
                enabled={
                  components?.selectedComponent?.sceneObj?.uuid === component.id
                }
              >
                {/* <Select enabled={components?.selectedComponent?.id === component?.id}> */}

                <RigidBody
                  type={component?.type === "plane" ? "fixed" : "fixed"}

                  // type="fixed"
                  // restitution={component?.type === "plane" ? 0 : null}
                  // friction={component?.type === "plane" ? 0.7 : null}
                >
                  <mesh 
                    position={component?.position}
                    rotation={component?.rotation}
                    onClick={(e) => {
                      console.log("event", e);
                      dispatch(setMode("translate"));
                      dispatch(
                        setSelectedComponent({
                          sceneObj: e.eventObject,
                          addedObj: component,
                        })
                      );
                    }}
                  >
                    <component.geometry
                      args={component?.scale}
                    />
                    <component.material
                    envMapIntensity={ envMapIntensity }
                      color={`${component?.color}`}
                      toneMapped={false}
                    />
                  </mesh>
                </RigidBody>
                {/* <RigidBody type="dynamic">  
                  <mesh position={[0, 4, 0]}>
                    <boxGeometry />
                    <meshBasicMaterial />
                  </mesh>
                </RigidBody> */}
              </Select>
            </Selection>
          </Physics>
        )}
      </>
    );
  });
});

export default Meshes;
