import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const editorSlice = createSlice({
  name: "editor",
  initialState: {
    data: [],
    mode: "translate",
    selectedComponent: undefined,
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
      };

      state.data.push(obj);
    },
    setMode: (state, action) => {
      {
        state.mode = action.payload.mode;
      }
    },
    setSelectedComponent: (state, action) => {
      console.log("id", action.payload);
      state.selectedComponent = action.payload;
    },

    removeComponent: (state, action) => {
      console.log("selected in slice",action)
      const i = state.data.findIndex((item) => item.id === action.payload);
      console.log("index",i)
      if(i!=-1){
        state.data.splice(i,1);
      }
      if(i==0){
        state.selectedComponent = undefined
      }
    
    },
  },
});

export const { addComponent, setMode, setSelectedComponent,removeComponent } =
  editorSlice.actions;
export default editorSlice.reducer;
