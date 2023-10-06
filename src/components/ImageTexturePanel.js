import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTexture } from "../Redux/editor.slice";

const ImageTexturePanel = (isOpen) => {
  const dispatch = useDispatch();
  const selectedComponents = useSelector((state) => state.selectedComponent);
  console.log("====>>>>",selectedComponents)

  return (
    <div className={`image-texture-panel ${isOpen ? "open" : ""}`}>
      <div className="content">
        {/* Add your image texture content here */}
        <img
          src="./image2.jpg"
          alt="Texture"
          height="150px"
          width="250px"
          style={{ border: "3px solid black", cursor: "pointer" }}
          onClick={() => {
            dispatch(updateTexture({selectedComponents: selectedComponents.addedObj,texture:"./image2.jpg"}));
          }}
        />
        <p>Additional content goes here.</p>
      </div>
    </div>
  );
};

export default ImageTexturePanel;
