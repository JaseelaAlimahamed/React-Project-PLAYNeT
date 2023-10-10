import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

export const checkIfVendorLoggedIn = () => {
    const token = localStorage.getItem('vendor');
    if (!token) return false;
    const decodedToken = jwtDecode(token);

    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('vendor');
        return false;
    }
    return true;
};

const initialState = {
    isLoggedIn: checkIfVendorLoggedIn(),
    vendorDetails:{},
    status:'',
    reason:''
}

const vendorSlice = createSlice({
    name:'vendor',
    initialState,
    reducers:{
        setVendorDetails:(state,action)=>{
            state.isLoggedIn = true;
            
            state.vendorDetails.name= action.payload.name
            state.vendorDetails.mobile=action.payload.mobile
            state.vendorDetails.document=action.payload.image
            
            state.status = action.payload.status;
            state.reason = action.payload.reason;
        },
        removeVendorDetails:(state,action)=>{
            state.isLoggedIn = false
            state.vendorDetails.name= ''
            state.vendorDetails.mobile= ''
            state.vendorDetails.document= ''
            state.status = ''
            localStorage.removeItem('vendor')
        }
    }
})

export const {setVendorDetails, removeVendorDetails} = vendorSlice.actions
export default vendorSlice.reducer