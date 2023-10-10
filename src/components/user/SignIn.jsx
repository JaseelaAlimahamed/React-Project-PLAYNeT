import React, { useState, useEffect, useRef } from 'react';
import iconimage from '../../public/Sports-PNG-Pic-removebg-preview.png';
import Google from './images/Google.png';


import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from '../../api/axios'
import { useDispatch, useSelector } from "react-redux";
import { googleSignin } from "../../context/UserAuth";
import { userLogin } from "../../redux/slices/userSlice";
import {signin} from '../../redux/userSignIn' 


const MOBILE_REGEX = /^[0-9]{10}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*]).{8,24}$/;

function SignIn() {

    const dispatch = useDispatch();

    const user = useSelector((state) => state);

    const navigate = useNavigate();
 

    const mobileRef = useRef();

    const [mobile, setMobile] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const [passwordHide, hideChange] = useState(false);

    useEffect(() => {
        setErrMsg(" ");
    }, [mobile, pwd]);
    useEffect(() => {
        mobileRef.current.focus();
    }, []);


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        const v2 = MOBILE_REGEX.test(mobile);
        const v3 = PWD_REGEX.test(pwd);
        if (!v2 || !v3) {
          setErrMsg("invalid entry");
          return;
        }
        try {
           const response = await dispatch(signin({ mobile, password:pwd }));
           setErrMsg(response?.payload?.message);
            
        } catch (error) {
            setErrMsg(error);
          // Handle error if sign-in fails
          console.error(error);
        }
      };
      

    



    const handleGoogleSignin = async (e) => {
        e.preventDefault();
        try {
            const googleToken = await googleSignin();
            console.log(googleToken);
            let { data } = await axios.post('/signin/google', googleToken.user)
            localStorage.setItem('user', data.accessToken);
            dispatch(userLogin())
            navigate("/");
        } catch (error) {
            setErrMsg(error.message);
        }
    };

    return (
        <section>
            {user?.user?.isLoggedIn && <Navigate to="/" replace />}
            <div className="grid grid-cols-1 sm:flex sm:flex-row justify-around items-center mt-10">

                <div className="flex mb-9">
                    <img src={iconimage} className="w-80 h-50 mt-5 ml-12" alt="Icon" />
                </div>
                <div className="p-7 bg-green-900 bg-opacity-50 my-10 mr-24">
                    <form className="flex flex-col items-center" onSubmit={handleFormSubmit} noValidate >
                        <h1 className="text-white text-4xl mb-4">SignIn</h1>

                        <p className={errMsg ? "errMsg bg-none p-1 m-4 text-red-500" : 'hidden'}>
                            {errMsg}
                        </p>

                        <div className="relative">
                            <input
                                type="number"
                                id="signupMobile"
                                ref={mobileRef}
                                className="w-80 mb-4 ml-2 p-2 rounded-md"
                                placeholder="Mobile"
                                autoComplete="off"
                                required
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                            />
                        </div>

                        <div className="relative flex">
                            <input
                                type={passwordHide ? "text" : "password"}
                                id="pwd"
                                className="w-80 mb-4 p-2 rounded-md"
                                placeholder="Password"
                                required
                                value={pwd}
                                onChange={(e) => setPwd(e.target.value)}
                            />
                            <p className="text-green-700 -ml-12 cursor-pointer select-none mt-1" onClick={() => hideChange(!passwordHide)}>
                                {passwordHide ? `hide` : `show`}
                            </p>
                        </div>

                        <button
                            className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"

                            type="submit"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="flex items-center my-4">
                        <hr className="w-1/2" />
                        <p className="mx-3">or</p>
                        <hr className="w-1/2" />
                    </div>

                    <div>
                        <button onClick={handleGoogleSignin} className="border-2 select-none bg-white border-slate-300 text-slate-500 hover:bg-[#edf3f2]  rounded-full pl-12 w-full text-xl font-roboto font-semibold  p-3">
                            Sign in with Google
                        </button>
                        <img src={Google} className="h-6 ml-10 sm:ml-16 -mt-10 select-none pointer-events-none" alt="" />
                    </div>

                    <div className="text-center">
                        <p className="px-16 py-10">
                            Don't have an account?&nbsp;
                            <Link to="/signup">
                                <span className="text-green-50 hover:text-green-300 hover:underline cursor-pointer">
                                    SignUp
                                </span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SignIn;
