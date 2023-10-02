import { useDispatch, useSelector } from "react-redux";
import { setMode, setSelectedComponent } from "../Redux/editor.slice";
import { useThree } from "@react-three/fiber";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";
import { useEffect, useRef } from "react";
import { Text3D } from "@react-three/drei";
import {
  EffectComposer,
  Outline,
  Select,
  Selection,
  Vignette,
} from "@react-three/postprocessing";
// import DrunkEffect from "./DrunkEffect";
import Drunk from "./Drunk.js";
import { useControls } from "leva";
import { BlendFunction } from "postprocessing";
export default function Component() {
  const dispatch = useDispatch();
  const components = useSelector((state) => state);
  const scene = useThree((state) => state.scene);
  const drunkRef = useRef();
  console.log("box", components?.data);
  console.log("selected", components?.selectedComponent?.uuid);
  console.log("Scene", scene.children);

  // const scene = useThree((state)=>state.scene)
  const exporter = new GLTFExporter();

  // exporter.parse(
  //   scene, // called when the gltf has been generated
  //   function (gltf) {
  //     console.log("gltf", gltf);
  //     // downloadJSON( gltf );
  //   },
  //   // called when there is an error in the generation
  //   function (error) {
  //     console.log("An error happened");
  //   }
  // );
  const drunkProps = useControls("Drunk Effect", {
    frequency: { value: 2, min: 1, max: 20 },
    amplitude: { value: 0.1, min: 0, max: 1 },
  });

  {
    return components?.data?.map((component) => {
      console.log("component", component);
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
            <Selection>
              <EffectComposer multisampling={8} autoClear={false}>
                <Outline
                  blur
                  visibleEdgeColor="yellow"
                  edgeStrength={100}
                  width={2500}
                />
                <Drunk
                  ref={drunkRef}
                  {...drunkProps}
                  blendFunction={BlendFunction.DARKEN}
                />
                {/* <Vignette/> */}
              </EffectComposer>
              <Select
                enabled={components.selectedComponent?.uuid === component.id}
              >
                {/* <Select enabled={components?.selectedComponent?.id === component.id}> */}

                <mesh
                  position={component?.position}
                  onClick={(e) => {
                    console.log("event", e);
                    dispatch(setMode("translate"));

                    dispatch(setSelectedComponent(e.eventObject));
                    // dispatch(setSelectedComponent(component));
                  }}
                >
                  <component.geometry
                    scale={component?.scale}
                    font={`./${component?.font}`}
                  />
                  {component?.text}
                  <component.material
                    color={`${component?.color}`}
                    toneMapped={false}
                  />
                </mesh>
              </Select>
            </Selection>
          )}
        </>
      );
    });
  }
}
