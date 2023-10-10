import React, { useState, useRef, useEffect } from "react";
import axios from "../../api/axios";
import { Navigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { setVendorDetails } from '../../redux/slices/vendorSlice'
import { Link } from "react-router-dom";
const VENDORSIGNIN_URL = '/vendor/signin'

function Signin() {
    const mobileRef = useRef();

    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [err,setErr] = useState('');
  
  
    const dispatch = useDispatch();
    const vendor = useSelector(state=>state.vendor);
  
    useEffect(()=>{
      mobileRef.current.focus();
    },[])
  
    useEffect(()=>{
      setErr('')
    },[mobile,password])
  
    const handleSignin = async (e) => {
      e.preventDefault();
      try {
        const {data} = await axios.post(
          VENDORSIGNIN_URL,
          JSON.stringify({ mobile, password }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        // console.log(JSON.stringify(response?.data));
        // localStorage.setItem("user",response.data);
        localStorage.setItem("vendor",data.accessToken);
        setMobile("");
        setPassword("");
        dispatch(setVendorDetails({mobile,...data}))
      } catch (error) {
        console.log(error);
        console.log(error.message)
        console.log(error.response.data)
        if (error.response.data){
          setErr(error.response.data.message)
        } else if (!error?.response) {
          setErr("no server response");
        } else if (error.repsonse?.status === 400) {
          setErr("missing mobile or password");
        } else if (error.response?.status === 401) {
          setErr("Unauthorized");
        } else if (error.response?.status === 403) {
          setErr("You are Blocked!")
        }  else {
          setErr("login failed");
        }
      }
    }
    return (
      <>
      {vendor.isLoggedIn && <Navigate to="/vendor" replace/>}
      <div className="bg-gradient-to-r min-h-screen from-black to-slate-950 opacity-80 py-32 sm:px-16 lg:px-32 xl:px-72 ">
       
        <div className="">
          <div className="grid place-items-center py-16 sm:py-32">
            <div className="h-45 rounded-md md:px-28 lg:px-16 space-y-6">
            <div className="w-full h-45 bg-green-800 shadow-md opacity-100 rounded-md p-8 space-y-6 ">
                <div className="space-y-1">
                  <h1 className="text-3xl font-roboto font-bold">
                    Welcome Back Turf Manager .
                  </h1>
                </div>
            <div className="p-5">
                  {err && <p>{err}</p>}
                  <form onSubmit={handleSignin}>
                    <input
                      ref={mobileRef}
                      type="Number "
                      className="input_Field m-4 w-full"
                      placeholder="Mobile"
                      value={mobile}
                      onChange={e=>setMobile(e.target.value)}
                      required
                    />
                    <input
                      type="password"
                      className="input_Field m-4 w-full"
                      placeholder="Password"
                      value={password}
                      onChange={e=>setPassword(e.target.value)}
                      required
                    />
                    <button className="duration-300 select-none p-2 mt-2 w-full rounded-full text-white text-xl font-roboto m-4  font-semibold  bg-green-900 hover:bg-green-400/70">
                      Sign in
                    </button>
                  </form>
                  <p className="font-semibold text-emerald-600 font-roboto cursor-pointer hover:underline">
                    Forgot password?
                  </p>
                  <div className="text-center">
                        <p className="px-16 py-10">
                            Don't have an account?&nbsp;
                            <Link to="/vendor/signup">
                                <span className="text-green-50 hover:text-green-300 hover:underline cursor-pointer">
                                    SignUp
                                </span>
                            </Link>
                        </p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
}

export default Signin
