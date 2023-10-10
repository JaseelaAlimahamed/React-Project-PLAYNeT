import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTurfs } from "../../../services/turfAxios";

export const turfs = createAsyncThunk(
    'vendor/turfs', async (_,thunkAPI) => {
        try {
           const data= await getTurfs()   
           
           return data;
        } catch (error) {
            console.log(error);
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
) 