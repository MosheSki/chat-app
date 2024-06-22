import { configureStore } from "@reduxjs/toolkit";
import conversationReducer from "./conversationReducer";

const appStore = configureStore({
  reducer: {
    conversation: conversationReducer,
  },
});

export default appStore;
