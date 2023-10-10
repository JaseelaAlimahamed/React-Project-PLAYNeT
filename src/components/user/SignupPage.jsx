import React, { useState, useEffect, useRef } from 'react';
import iconimage from '../../public/Sports-PNG-Pic-removebg-preview.png';
import jwtDecode from "jwt-decode";



import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Google from './images/Google.png'
import axios from '../../api/axios'
import setUpRecaptcha from '../../context/UserAuth'
import { setUserDetails, userLogin } from "../../redux/slices/userSlice";
import { Info, Check, Cross } from './images/Icons'

const USER_REGEX = /^[a-zA-z][a-zA-Z0-9-_ ]{3,23}$/;
const MOBILE_REGEX = /^[0-9]{10}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%*]).{8,24}$/;
const VALID_OTP = /^[0-9]{6}$/;

const SIGNUP_URL = "/signup";
const MOBILE_URL = "/mobileExist";


function SignupPage() {
  const userRef = useRef();
  const errRef = useRef();
  

  const dispatch = useDispatch();
  const navigatee = useNavigate();


  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [mobile, setMobile] = useState("");
  const [validMobile, setValidMobile] = useState(false);
  const [mobileFocus, setMobileFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatchPwd, setValidMatchPwd] = useState(false);
  const [matchPwdFocus, setMatchPwdFocus] = useState(false);

  const [timer, setTimer] = useState(60);

  const [errMsg, setErrMsg] = useState("");

  const [success, setSuccess] = useState(false);

  const [confirm, setConfirm] = useState("");

  const [OTP, setOTP] = useState("");
  const [OTPFocus, setOTPFocus] = useState(false);
  const [validOTP, setValidOTP] = useState(false);
  const otpRefs = useRef([]);
  const timeoutMilliseconds = 100000;


  useEffect(() => {
    let token = localStorage.getItem("user");
    if (token === true) {
      const user = jwtDecode(token);
    }
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = MOBILE_REGEX.test(mobile);
    setValidMobile(result);
  }, [mobile]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatchPwd(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, mobile, pwd, matchPwd]);

  useEffect(() => {
    const result = VALID_OTP.test(OTP);
    setValidOTP(result);
  }, [OTP]);


  const handleOTPChange = (e, index) => {
    const value = e.target.value;
    setOTP((prevOTP) => {
      const newOTP = prevOTP.split("");
      newOTP[index] = value;
      const updatedOTP = newOTP.join("");
      setValidOTP(updatedOTP.length === 6);
      return updatedOTP;
    });
    if (value.length === 1 && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1].focus();
    }
  };



  useEffect(() => {
    let timerId;

    if (success && timer > 0) {
      timerId = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }

    return () => clearTimeout(timerId);
  }, [success, timer]);

  const handleResendOTP = async () => {
    if (timer !== 0) return;
    try {
      const otpResponse = await setUpRecaptcha("+91" + mobile);
      setConfirm(otpResponse);

    } catch (error) {
      console.log(error.message)
    }
  }


  const handleSignup = async (e) => {
    e.preventDefault();
    //if button enabled with JS hack or other some reason
    const v1 = USER_REGEX.test(user);
    const v2 = MOBILE_REGEX.test(mobile);
    const v3 = PWD_REGEX.test(pwd);
    if (!v1 || !v2 || !v3) {
      setErrMsg("invalid entry");
      return;
    }
    try {

      const response = await axios.post(
        MOBILE_URL,
        JSON.stringify({ mobile }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          timeout: timeoutMilliseconds, 
        }
      );
      setErrMsg(response?.message);

      const otpResponse = await setUpRecaptcha("+91" + mobile);
      setConfirm(otpResponse);
      setSuccess(true);
    } catch (error) {
      if (error.code === "auth/argument-error") {
        setErrMsg(" ");
      } else if (error.response?.status === 409) {
        setErrMsg("mobile already taken");
      } else {
        setErrMsg("Error Occured try again");
      }
      errRef.current.focus();
    }
  };


  const handleOTP = async (e) => {
    e.preventDefault();
    if (!OTP) {
      setErrMsg("Invalid OTP");
      return;
    }
    try {
      await confirm.confirm(OTP).then(async () => {
        const { data } = await axios.post(
          SIGNUP_URL,
          JSON.stringify({ name: user, mobile, password: pwd }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            timeout: timeoutMilliseconds, // Set the timeout here
          }
        );
        console.log(user);
        dispatch(setUserDetails({ name: user, mobile, wallet: 0 }))
        dispatch(userLogin())
        localStorage.setItem("user", JSON.stringify(data));
        setUser("");
        setMobile("");
        setPwd("");
        setMatchPwd("");
        navigatee("/signin");
      });
    } catch (error) {

      if (error.message === 'Firebase: Error (auth/invalid-verification-code).') {
        setErrMsg('invalid OTP')
      } else if (!error?.response) {
        setErrMsg("no server response");
      } else if (error.response?.status === 409) {
        setErrMsg("Mobile already registered");
      } else {
        setErrMsg("registration failed");
      }
    }
  };

  return (
    <section>
        {success ? (
        <div className="flex items-center justify-center h-screen">
        <div className="bg-black bg-opacity-80 p-8 rounded-lg">
          <form className="flex flex-col items-center" onSubmit={handleOTP}>
            <h1 className="text-white mb-4">Enter your OTP that was sent to your mobile</h1>
            <p className="text-white mb-4">Just play. Have fun. Enjoy the game.</p>
            <p ref={errRef} className={errMsg ? "errmsg text-red-700" : "offscreen"}>
              {errMsg}
            </p>
            <div className="otp-input-container flex">
              {Array.from({ length: 6 }, (_, index) => (
                <input
                  ref={(ref) => (otpRefs.current[index] = ref)}
                  key={index}
                  className="m-3 w-5 bg-black text-white "
                  type="number"
                  id={`OTP-${index + 1}`}
                  placeholder="_"
                  required
                  value={OTP[index] || ""}
                  onChange={(e) => handleOTPChange(e, index)}
                  onFocus={() => setOTPFocus(true)}
                  onBlur={() => setOTPFocus(false)}
                  minLength={1}
                  maxLength={1}
                />
              ))}
            {validOTP && (
              <div className=" ml-70 mt-8 text-green-400 text-xl pointer-events-none">
                <Check />
              </div>
            )}
            {!validOTP && OTP && (
              <div className=" ml-70 mt-10 text-red-400 text-xl pointer-events-none">
                <Cross />
              </div>
            )}
            </div>
            <p
              className={
                OTPFocus && OTP && !validOTP ? "block text-red-700 bg-[#f0e1e1] rounded p-2" : "hidden"
              }
            >
              <Info />
              Enter a six-digit OTP.
            </p>
            {/* <div id="recaptcha-container"></div> */}
            <p
              className={`${
                timer === 0 ? "text-blue-500 hover:underline cursor-pointer" : "text-cyan-600 cursor-not-allowed"
              }`}
              onClick={handleResendOTP}
              disabled={timer === 0 ? false : true}
            >
              Resend OTP <span className={`text-black ${timer === 0 && "hidden"}`}>{timer}</span>
            </p>
            <button
              className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              disabled={!validOTP ? true : false}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      

        ) : (
      <div className="grid grid-cols-1 sm:flex sm:flex-row justify-around items-center mt-10">
        <div className='w-1/6 m-10'>

        </div>
        <div className="flex mb-9">
          <img src={iconimage} className="w-80 h-50  mb-5 " alt="Icon" />
        </div>
        <div className="p-7 flex justify-center w-84 bg-green-900 bg-opacity-50 mx-auto my-10">
            <div>
              <form className="flex flex-col items-center" onSubmit={handleSignup} noValidate>
                <h1 className="text-white text-4xl mb-4">SignUp</h1>

                <p
                  ref={errRef}
                  className={errMsg ? "errmsg text-red-700" : "offscreen"}
                >
                  {errMsg}
                </p>
                <div className="relative">
                  <input
                    type="text"
                    id="signupName"
                    autoComplete="off"
                    className="w-80 mb-4 p-2 rounded-md"
                    placeholder="Name"
                    required
                    value={user}
                    ref={userRef}
                    onChange={(e) => setUser(e.target.value)}
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                  />
                  {validName && (
                    <div className="absolute ml-80 -mt-12 text-green-400 text-xl pointer-events-none">
                      <Check />
                    </div>
                  )}
                  {!validName && user && (
                    <div className="absolute ml-80 -mt-12 text-red-400 text-xl pointer-events-none">
                      <Cross />
                    </div>
                  )}
                  <p
                    className={
                      userFocus && user && !validName
                        ? "block font-roboto text-red-700 bg-[#f0e1e1] rounded p-2"
                        : "hidden"
                    }
                  >
                    <Info />
                    4 to 23 character.
                    <br />
                    Must begin with a letter.
                    <br />
                    Letters, numbers, underscores,
                    <br />
                    hyphens allowed.
                  </p>
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="w-80 mb-4 p-2 rounded-md"
                    required
                  />
                </div>
                <div>
                  <input
                    type="number"
                    id="signupMobile"
                    placeholder="Mobile Number"
                    className="w-80 mb-4 p-2 rounded-md"
                    autoComplete="off"
                    maxLength={10}
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    onFocus={() => setMobileFocus(true)}
                    onBlur={() => setMobileFocus(false)}
                  />
                  {validMobile && (
                    <div className="absolute ml-80 -mt-12 text-green-400 text-xl pointer-events-none">
                      <Check />
                    </div>
                  )}
                  {!validMobile && mobile && (
                    <div className="absolute ml-80 -mt-12 text-red-400 text-xl pointer-events-none">
                      <Cross />
                    </div>
                  )}
                  <p
                    className={
                      mobileFocus && mobile && !validMobile
                        ? "block font-roboto text-red-700 bg-[#f0e1e1] rounded p-2"
                        : "hidden"
                    }
                  >
                    <Info />
                    Enter valid number.
                    <br />
                  </p>
                </div>
                <div>
                  <input
                    type="password"
                    id="pwd"
                    className="w-80 mb-4 p-2 rounded-md"
                    placeholder="Set Password"
                    required
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                  />
                  {validPwd && (
                    <div className="absolute ml-80 -mt-12 text-green-400 text-sm pointer-events-none">
                      <Check />
                    </div>
                  )}
                  {!validPwd && pwd && (
                    <div className="absolute ml-80 mt-12 text-red-400 text-sm pointer-events-none">
                      <Cross />
                    </div>
                  )}
                  <p
                    className={
                      pwdFocus && pwd && !validPwd
                        ? "block font-roboto text-red-700 bg-[#f0e1e1] rounded p-2"
                        : "hidden"
                    }
                  >
                    <Info />
                    8 to 24 character.
                    <br />
                    Must include uppercase and lowercase
                    <br />
                    letters,number and
                    <br />
                    special character. <br />
                    Allowed special character:
                    <span>! @ # * $ %</span>
                  </p>
                </div>

                <div>
                  <input
                    type="password"
                    id="matchPwd"
                    className="w-80 mb-4 p-2 rounded-md"
                    placeholder="Confirm Password"
                    required
                    value={matchPwd}
                    onChange={(e) => setMatchPwd(e.target.value)}
                    onFocus={() => setMatchPwdFocus(true)}
                    onBlur={() => setMatchPwdFocus(false)}
                  />
                  {validMatchPwd && matchPwd && (
                    <div className="absolute ml-80 -mt-12 text-green-400 text-xl pointer-events-none">
                      <Check />
                    </div>
                  )}
                  {!validMatchPwd && matchPwd && (
                    <div className="absolute ml-80 -mt-12 text-red-400 text-xl pointer-events-none">
                      <Cross />
                    </div>
                  )}
                  <p
                    className={
                      matchPwdFocus && !validMatchPwd && matchPwd
                        ? "block font-roboto text-red-700 bg-[#f0e1e1] rounded p-2"
                        : "hidden"
                    }
                  >
                    <Info />
                    Must match the first password input field.
                    <br />
                  </p>
                </div>
                <div id="recaptcha-container">

                </div>
                <button
                  className="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  disabled={
                    !validName ||
                      !validMobile ||
                      !validPwd ||
                      !validMatchPwd
                      ? true
                      : false
                  }
                  type="submit"
                >
                  Sign up
                </button>

              </form>
              <div className="flex items-center my-4">
                <hr className="w-1/2 " />
                <p className="mx-3">or</p>
                <hr className="w-1/2" />
              </div>
              <div>
                <button className="border-2 select-none bg-white border-slate-300 text-slate-500 hover:bg-[#edf3f2]  rounded-full pl-12 w-full text-xl font-roboto font-semibold  p-3">
                  Sign in with Google
                </button>
                <img
                  src={Google}
                  className="h-6 ml-10 sm:ml-16  -mt-10 select-none pointer-events-none"
                  alt=""
                />
              </div>
              <div className="place-content-center">
                <p className="px-16 py-10">
                  already have an account? &nbsp;
                  <Link to="/signin">
                    <span className="text-green-50 hover:text-green-300 hover:underline cursor-pointer">
                      signin
                    </span>
                  </Link>
                </p>
              </div>
        </div>
      </div >
      </div>
        )}
    </section>
  );
}

export default SignupPage;
