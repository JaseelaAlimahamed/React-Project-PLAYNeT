
import { RecaptchaVerifier,signInWithPhoneNumber, signInWithPopup, GoogleAuthProvider, } from "firebase/auth";
import { auth } from "../firebase";


 
  function setUpRecaptcha(number) {
    console.log(number)

    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    
    recaptchaVerifier.render();
    console.log(number)
    console.log(auth)
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

 export const googleSignin = ()=>{
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth,googleAuthProvider)
  }

export default setUpRecaptcha;