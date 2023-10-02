import React, { useState } from "react";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { addComponent, removeComponent,setMode } from "../Redux/editor.slice";
import { SketchPicker } from "react-color";
// import { useThree } from "@react-three/fiber";
// import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

function Sidebar() {
  const [show, setShow] = useState(false);
  const [color, setColor] = useState("lightblue");
  const [selectedValue, setSelectedValue] = useState("translate");

  const dispatch = useDispatch();
  const selectedComponents = useSelector((state) => state.selectedComponent);

  // const scene = useThree((state)=>state.scene)
  // const exporter = new GLTFExporter();

  // const exportGLTF= ()=>{
  //   exporter.parse(
  //     scene,
  // )
  // }
  console.log("selectedComponent1", selectedComponents);
  const box = {
    geometry: "boxGeometry",
    scale: [2, 2, 2],
    position: [0, 0, 0],
    color: color,
    material: "meshStandardMaterial",
  };

  const circle = {
    geometry: "CylinderGeometry",
    scale: [5, 5, 1, 64],
    position: [1, 1, 0],
    color: color,
    material: "meshStandardMaterial",
  };

  const capsule = {
    geometry: "capsuleGeometry",
    scale: [5, 5, 10, 20],
    position: [2, 1, 0],
    color: color,
    material: "meshStandardMaterial",
  };

  const text = {
    geometry: "Text3D",
    scale: [5, 5, 10, 20],
    position: [2, 1, 0],
    color: color,
    material: "meshNormalMaterial",
    font: "helvetiker_regular.typeface.json",
    text: "Hello",
    type: "text",
  };
  const pickerStyle = {
    default: {
      picker: {
        position: "absolute",
        // bottom: "2px",
        left: "10px",
      },
    },
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    dispatch(setMode(event?.target?.value))
  };
  console.log("updated color is:", color);
  return (
    <div className="sidebar">
      <h2>Select Shape</h2>
      <hr />
      <ul>
        <li
          onClick={() => {
            dispatch(addComponent(box));
          }}
        >
          Box
        </li>
        <li
          onClick={() => {
            dispatch(addComponent(circle));
          }}
        >
          Circle
        </li>
        <li
          onClick={() => {
            dispatch(addComponent(capsule));
          }}
        >
          Capsule
        </li>
        <li
          onClick={() => {
            dispatch(addComponent(text));
          }}
        >
          Text
        </li>
        {selectedComponents === undefined ? null : (
          <button
            onClick={() => {
              dispatch(removeComponent(selectedComponents.uuid));
            }}
          >
            Delete
          </button>
        )}
      </ul>
      <button
        onClick={() => {
          setShow(!show);
        }}
      >
        {show ? "Close Color Picker" : "Open Color Picker"}
      </button>
      {show ? (
        <SketchPicker
          styles={pickerStyle}
          color={color}
          onChange={(updatedColor) => setColor(updatedColor.hex)}
        />
      ) : null}
      {selectedComponents ? (
        <select value={selectedValue} onChange={handleSelectChange}>
          <option value="translate">Translate</option>
          <option value="scale">Scale</option>
          <option value="rotate">Rotate</option>
        </select>
      ) : null}
    </div>
  );
}

export default Sidebar;
