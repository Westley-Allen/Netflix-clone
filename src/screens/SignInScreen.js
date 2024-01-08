import React, { useRef } from "react";
import "./SignInScreen.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

function SignInScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="signIn_screen">
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder="Email" type="email" />
        <input ref={passwordRef} placeholder="Password" type="password" />
        <button type="submit" onClick={signIn}>
          Submit
        </button>

        <h4>
          <span className="signInScreen_gray">New to Netflix? </span>
          <span className="signInScreen_link" onClick={register}>
            Sign Up Now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignInScreen;
