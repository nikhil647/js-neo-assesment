import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import widgetReducer from "./widget";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { taskSlice } from "./tasks";
//Redux Store

export const reducers = {
  widget: widgetReducer,
  [taskSlice.reducerPath]: taskSlice.reducer,
};

// export const store = (preloadedState) => {
//   return configureStore({
//     reducer: reducers,
//     preloadedState,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         immutableCheck: false,
//         serializableCheck: false,
//       }).concat(taskSlice.middleware),
//   });
// };

// //Caching Listener
// setupListeners(store.dispatch);
// export default store;

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: reducers,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(taskSlice.middleware),
  });
};

//module.exports = { setupStore };
