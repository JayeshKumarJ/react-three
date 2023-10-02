import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import editorReducer from './editor.slice'

export default configureStore({
  reducer: editorReducer

})