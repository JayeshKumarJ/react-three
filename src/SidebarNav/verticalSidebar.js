import React, { useState } from "react";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addComponent,
  addModel,
  removeComponent,
  removeModel,
  setMode,
  updateColor,
} from "../Redux/editor.slice";
import { SketchPicker } from "react-color";
import { useThree } from "@react-three/fiber";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";

function Sidebar({ handleClick }) {
  const [show, setShow] = useState(false);
  const [color, setColor] = useState("lightblue");
  const [selectedValue, setSelectedValue] = useState("translate");

  const dispatch = useDispatch();
  const selectedComponents = useSelector((state) => state.selectedComponent);
  const selectedModel =useSelector((state)=>state.selectedModel);
  const mode = useSelector((state) => state.mode);
  const data = useSelector((state) => state.data);

  console.log("selectedComponent1", selectedComponents);
  console.log("updated data", data);
  const box = {
    geometry: "boxGeometry",
    scale: [2, 1, 0.1],
    position: [0, 0, 0],
    color: color,
    material: "meshStandardMaterial",
    type: "box",
  };

  const circle = {
    geometry: "CylinderGeometry",
    scale: [1, 1, 1, 64],
    position: [0, 0, 0],
    color: color,
    material: "meshStandardMaterial",
    type: "circle",
  };

  const capsule = {
    geometry: "capsuleGeometry",
    scale: [1, 1, 10, 20],
    position: [0, 0, 0],
    color: color,
    material: "meshStandardMaterial",
    type: "capsule",
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

  const plane = {
    geometry: "boxGeometry",
    scale: [5, 5, 0.1],
    position: [0, -0.5, 1],
    color: color,
    material: "meshStandardMaterial",
    type: "plane",
    rotation: [-Math.PI / 2, 0, 1],
  };

  const modal = {
    url: "./cover_chair.glb",
    scale: 0.5,
    type:"model"
  };
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    dispatch(setMode(event?.target?.value));
  };
  console.log("updated color is:", color);
  return (
    <div className="sidebar">
      <h2>Select Shape</h2>
      <hr />
      <ul>
        <li
          onClick={() => {
            dispatch(addComponent(plane));
          }}
        >
          Plane
        </li>
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

        <li
          onClick={() => {
            dispatch(addComponent(modal));
          }}
        >
          Model
        </li>
        {selectedComponents === undefined ? null : (
          <button
            onClick={(e) => {
              dispatch(removeComponent(selectedComponents));
            }}
          >
            Delete 
          </button>
        )}
      
      </ul>
      {selectedComponents ? (
        <>
          {/* <br /> */}
          <select value={mode} onChange={handleSelectChange}>
            <option value="translate">Translate</option>
            <option value="scale">Scale</option>
            <option value="rotate">Rotate</option>
          </select>
        </>
      ) : null}
      {selectedComponents ? (
        <>
          <br />
          <button onClick={handleClick}>Export Scene</button>
        </>
      ) : null}
      <br />
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
          onChange={(updatedColor) => {
            setColor(updatedColor.hex);
            dispatch(
              updateColor({
                color: updatedColor.hex,
                selectedComponents: selectedComponents.addedObj,
              })
            );
          }}
        />
      ) : null}
    </div>
  );
}

export default Sidebar;
