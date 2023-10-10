import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";


import userReducer from "./slices/userSlice";
import vendorReducer from "./slices/vendorSlice"
import adminReducer from './slices/adminSlice'
import vendorTrufsReducer from './slices/turf/turfSlice'
import bookingSlice from "./slices/turf/bookingSlice";


const reducers = combineReducers({   
  user: userReducer,
  vendor: vendorReducer,
  admin:adminReducer,
  vendorTrufs:vendorTrufsReducer,
  booking:bookingSlice,
});

export const store = configureStore({
  reducer : reducers,
  middleware:[thunk]
});



