import { configureStore, combineSlices } from "@reduxjs/toolkit";

import alertSlice from "./slices/alertSlice";

export const store = configureStore({
  reducer: combineSlices({
    alert: alertSlice,
  }),
});
