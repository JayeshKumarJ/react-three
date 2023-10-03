import { useDispatch, useSelector } from "react-redux";
import { setMode, setSelectedComponent } from "../Redux/editor.slice";
import { useThree } from "@react-three/fiber";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";
import {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  Component,
} from "react";
import { Text3D } from "@react-three/drei";
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
// import { GLTFExporter } from 'three/addons/loaders/GLTFExporter';

const Meshes = forwardRef(function Component(props, ref) {
  const dispatch = useDispatch();
  const components = useSelector((state) => state);
  const scene = useThree((state) => state.scene);
  const drunkRef = useRef();
  console.log("box", components?.data);
  console.log("selected", components?.selectedComponent?.uuid);
  console.log("Scene =>", scene);

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
  return components?.data?.map((component) => {
    console.log("component", component);
    console.log("type:::", component?.type === "plane" ? "fixed" : "dynamic");
    return (
      <>
        {component?.type === "text" ? (
          <mesh
            onClick={() => {
              dispatch(setSelectedComponent(component));
            }}
          >
            <Text3D font={`./${component?.font}`}>
              {component?.text}
              <meshNormalMaterial />
            </Text3D>
          </mesh>
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
              {/* <Select
                enabled={components.selectedComponent?.uuid === component.id}
              > */}
                <Select enabled={components?.selectedComponent?.id === component?.id}>

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
                      // dispatch(setSelectedComponent(e.eventObject));
                      // type= {component}

                      dispatch(setSelectedComponent(component));
                    }}
                  >
                    <component.geometry
                      args={component?.scale}
                      // font={`./${component?.font}`}
                    />
                    {/* {component?.text} */}
                    <component.material
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
