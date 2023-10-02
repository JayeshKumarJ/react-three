import { useDispatch, useSelector } from "react-redux";
import { setMode, setSelectedComponent } from "../Redux/editor.slice";
import { useThree } from "@react-three/fiber";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";
import { useEffect } from "react";
import { Text3D } from "@react-three/drei";
import {
  EffectComposer,
  Outline,
  Select,
  Selection,
} from "@react-three/postprocessing";

export default function Component() {
  const dispatch = useDispatch();
  const components = useSelector((state) => state);
  const scene = useThree((state) => state.scene);

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
              </EffectComposer>
              <Select enabled={components.selectedComponent?.uuid === component.id}>
              {/* <Select enabled={components?.selectedComponent?.id === component.id}> */}

                <mesh
                  position={component?.position}
                  onClick={(e) => {
                    console.log("event", e);
                    dispatch(setMode("translate"))

                    dispatch(setSelectedComponent(e.eventObject));
                    // dispatch(setSelectedComponent(component));

                  }}
                >
                  <component.geometry
                    scale={component?.scale}
                    font={`./${component?.font}`}
                  />
                  {component?.text}
                  <component.material color={`${component?.color}`} />
                </mesh>
              </Select>
            </Selection>
          )}
        </>
      );
    });
  }
}
