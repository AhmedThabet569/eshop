import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './slices/cartSlice';

const store = configureStore({
  reducer: {
    cart:cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["actionWithFilePayload"],
        ignoredPaths: ["stateWithFile"],
      },
    }),
  devTools:true
}); 
export default store;
// Compare this snippet from src/context/data/myContext.jsx: