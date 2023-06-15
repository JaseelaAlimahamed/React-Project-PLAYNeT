import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

export const signin = createAsyncThunk(
    'user/signin',
    async (userData, thunkAPI) => {
      try {
        // console.log(userData); 
        const { data } = await axios.post("/signin", userData)
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  )