import { Canvas } from "@react-three/fiber";
import Box from "./components/mesh";
import { TransformControls, OrbitControls } from "@react-three/drei";
import { DoubleSide } from "three";
import { Counter } from "./Redux/Counter";
import Sidebar from "./SidebarNav/verticalSidebar";
import Component from "./components/mesh";
import { useSelector } from "react-redux";
import {
  EffectComposer,
  Outline,
  Select,
  Selection,
} from "@react-three/postprocessing";
import Scene from "./components/Scene";
import { useRef } from "react";

function App() {
  const created = ({ gl }) => {
    gl.setClearColor("#ff0000", 1);
  };

  const ref = useRef(null);
  function handleClick() {
    ref.current.download();
    // This won't work because the DOM node isn't exposed:
    // ref.current.style.opacity = 0.5;
  }

  return (
    <div
      id="canvas-container"
      style={{ width: "100vw", height: "100vh", float: "right" }}
    >
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-4, 3, 6],
        }}
        onCreated={created}
      >
        <Scene ref={ref} />
      </Canvas>
      <Sidebar handleClick={handleClick} />
    </div>
  );
}

export default App;
