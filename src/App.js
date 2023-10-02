import { Canvas } from "@react-three/fiber";
import Box from "./components/box";
import { TransformControls, OrbitControls } from "@react-three/drei";
import Circle from "./components/circle";
import { DoubleSide } from "three";
import Capsule from "./components/capsule";
import { Counter } from "./Redux/Counter";
import Sidebar from "./SidebarNav/verticalSidebar";
import Component from "./components/box";
import { useSelector } from "react-redux";
import {
  EffectComposer,
  Outline,
  Select,
  Selection,
} from "@react-three/postprocessing";
import Scene from "./components/Scene";

function App() {
  const created = ({ gl }) =>
{
    gl.setClearColor('#ff0000', 1)
}
  return (
    <div
      id="canvas-container"
      style={{ width: "100vw", height: "100vh", float: "right" }}
    >
      <Canvas
      camera={ {
        fov: 45,
        near: 0.1,
        far: 200,
        position: [ - 4, 3, 6 ]
    } }
    onCreated={ created }
      >
        <Scene />
      </Canvas>
      <Sidebar />
    </div>
  );
}

export default App;
