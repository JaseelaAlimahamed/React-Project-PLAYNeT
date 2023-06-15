import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import userReducer from "./userSlice";
import vendorReducer from "./vendorSlice"

const reducers = combineReducers({   
  user: userReducer,
  vendor: vendorReducer,
});

export const store = configureStore({
  reducer : reducers,
  middleware:[thunk]
});



