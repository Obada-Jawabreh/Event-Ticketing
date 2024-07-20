import React, { useState } from "react";
import {
  auth,
  dbURL,
  loginFirebase,
  GoogleAuthProvider,
  signInWithPopup,
} from "./../FirebaseConfig/Config.jsx";
import axios from "axios";
import Form from "../Components/Form/Form";
import { GoogleBtn } from "../Components/Buttons/VerButton";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e, form) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await loginFirebase(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;
      console.log("User logged in:", user);
      localStorage.setItem("user", JSON.stringify(user.uid));
      navigate("/");
    } catch (error) {
      setError("Incorrect email or password.");
      console.error("Error logging in:", error.message);
    }
  };

  // login by google
  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const user = result.user;
      console.log("users this ", user);
      const userData = {
        name: user.displayName || "",
        email: user.email || "",
        id: user.uid,
      };

      await axios.put(`${dbURL}/users/${user.uid}.json`, userData);
      localStorage.setItem("user", JSON.stringify(user.uid));

      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-12 px-52 h-screen justify-center content-start pt-24">
      <div className="flex flex-col gap-6">
        <Form
          title={"Login"}
          formArr={[
            {
              label: "Email",
              name: "email",
              type: "text",
              onChange: (e) => setEmail(e.target.value),
            },
            {
              label: "Password",
              name: "password",
              type: "password",
              onChange: (e) => setPassword(e.target.value),
            },
          ]}
          subitBtn={"Login"}
          onSubmit={handleLogin}
          withEvent={true}
          redirect={{
            label: "Don't have an account?",
            link: {
              label: "Register",
              to: "/signup",
            },
          }}
        />
        {error && <div className="text-red-500">{error}</div>}
        <GoogleBtn onClick={handleGoogleLogin} className="google-btn">
          Sign Up with Google
        </GoogleBtn>
      </div>
      <div className="">
        <img
          src="https://i.pinimg.com/564x/89/d9/8d/89d98d4048d9700df7dda17fdb4c073a.jpg"
          alt="Event"
          className="rounded-lg"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
}

export default Login;
