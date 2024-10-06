import { configureStore } from "@reduxjs/toolkit";
import thoughtSlice from "./slices/thoughtSlice";

const store = configureStore({
    reducer: {
        thoughts: thoughtSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    devTools: true,
});

export default store;