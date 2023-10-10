import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import {signin} from '../userSignIn'




export const checkIfUserLoggedIn = () => {
   
    const token = localStorage.getItem('user');
  
    if (!token) {
      return false;
    }
  
    try {
        
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = Date.now();
  
      if (expirationTime < currentTime) {
        localStorage.removeItem('user');
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error decoding the token:', error);
      return false;
    }
  };
const initialState = () => ({
    isLoggedIn: checkIfUserLoggedIn(),
    mobile: '',
    name: '',
    wallet: 0,
    signin: {
      isLoading: false,
      isErr: false,
      errMsg: ""
    }
  });
    
const userSlice = createSlice({
    name: "user",
    initialState: initialState(),
    reducers: {
      setUserDetails:(state, action) => {
        state.name = action.payload.name;
        state.mobile = action.payload.mobile;
        state.wallet = action.payload.wallet
        state.isLoggedIn = true;
      },
        userLogin: (state, action) => {
            state.isLoggedIn = true;
        },
        userLogout: (state, action) => {
            state.isLoggedIn = false;
            state.name = ''
            state.mobile = '';
            state.wallet = 0
            localStorage.removeItem('user');
        },
        updateWallet: (state, action) => {
            state.wallet = action.payload.wallet
        },
        changeName: (state,action) => {
            state.name = action.payload
        }
    },
     extraReducers: (builder) => {

        builder.addCase(signin.pending, (state) => {
            state.signin.isLoading = true
        });

        builder.addCase(signin.fulfilled, (state, action) => {
            localStorage.setItem('user',action.payload.accessToken);
           
            state.mobile = action.payload.mobile
            state.name = action.payload.name
            state.wallet = action.payload.wallet
            state.signin.isLoading = false;
            state.signin.errMsg = ''
            state.isLoggedIn = true;
        });

        builder.addCase(signin.rejected, (state, action) => {
            state.signin.errMsg = action.payload.message
        }); 

    }
 
})

export const { setUserDetails, userLogout, userLogin, updateWallet, changeName } = userSlice.actions;
const userReducer = userSlice.reducer;
const rootReducer = (state, action) => {
    console.log('Previous state:', state);
    return userReducer(state, action);
};
export default rootReducer;