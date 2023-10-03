import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const editorSlice = createSlice({
  name: "editor",
  initialState: {
    data: [],
    mode: "translate",
    selectedComponent: undefined,
    color: "red",
  },
  reducers: {
    addComponent: (state, action) => {
      console.log("action", action);

      const obj = {
        id: uuidv4(),
        geometry: action.payload.geometry,
        material: action.payload.material,
        scale: action.payload.scale,
        position: action.payload.position,
        color: action.payload.color,
        font: action.payload.font,
        text: action.payload.text,
        type: action.payload.type,
        rotation: action.payload.rotation,
      };

      state.data.push(obj);
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setSelectedComponent: (state, action) => {
      state.selectedComponent = action.payload;
    },

    removeComponent: (state, action) => {
      console.log("action", action);
      const i = state.data.findIndex((item) => item.id === action.payload.id);
      console.log("index", i);
      if (i !== -1) {
        state.data.splice(i, 1);
      }
      if (i === 0) {
        state.selectedComponent = undefined;
      }
    },
    updateColor: (state, action) => {
      console.log("update color action", action);
      // function updateColorById(idToUpdate, newColor) {
      const updatedData = state.data.map((item) => {
        // Check if the current object's id matches the id to update
        console.log("item in update",item)
        if (item.id === action.payload.selectedComponents?.id) {
          // Create a new object with the updated color
          return { ...item, color: action.payload.color };
        }
        // If the id doesn't match, return the original object
        return item;
      });

      state.data = updatedData;

      // return updatedData;
      // }
    },
  },
});

export const {
  addComponent,
  setMode,
  setSelectedComponent,
  removeComponent,
  updateColor,
} = editorSlice.actions;
export default editorSlice.reducer;
