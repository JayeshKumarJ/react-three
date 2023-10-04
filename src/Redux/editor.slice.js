import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const editorSlice = createSlice({
  name: "editor",
  initialState: {
    data: [],
    mode: "translate",
    selectedComponent: undefined,
    color: "red",
    modelData: [],
  },
  reducers: {
    addComponent: (state, action) => {
      // console.log("action", action);

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
      console.log("action in set mode", action);
      state.mode = action.payload;
    },
    setSelectedComponent: (state, action) => {
      console.log("action obj", action.payload);
      // console.log("idididid",action.payload.sceneObj.geometry.uuid )
      state.selectedComponent = action.payload;
      const updatedData = state.data.map((item) => {
        if (item.id === action.payload.addedObj.id) {
          return { ...item, id: action.payload.sceneObj.uuid };
        }
        return item;
      });
      state.data = updatedData;
    },

    removeComponent: (state, action) => {
      console.log("action", action);
      const i = state.data.findIndex(
        (item) => item.id === action.payload.addedObj?.id
      );
      // console.log("index", i);
      if (i !== -1) {
        state.data.splice(i, 1);
      }
      if (i === 0) {
        state.selectedComponent = undefined;
      }
    },
    updateColor: (state, action) => {
      // console.log("update color action", action);
      // function updateColorById(idToUpdate, newColor) {
      const updatedData = state.data.map((item) => {
        if (item.id === action.payload.selectedComponents.id) {
          return { ...item, color: action.payload.color };
        }
        return item;
      });
      state.data = updatedData;
    },
    editText: (state, action) => {
      console.log("editText", action);

      const updateData = state.data.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, text: action.payload.text };
        }
        return item;
      });
      state.data = updateData;
    },
    addModel: (state, action) => {
      console.log("model action",action)
      const obj = {
        id: uuidv4(),
        url: action.payload.url,
        scale:action.payload.scale,
      };
      state.modelData.push(obj);
    },
  },
});

export const {
  addComponent,
  setMode,
  setSelectedComponent,
  removeComponent,
  updateColor,
  editText,
  addModel,
} = editorSlice.actions;
export default editorSlice.reducer;
