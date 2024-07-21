import React, { useState } from "react";
import {
  auth,
  dbURL,
  createUser,
  signInWithPopup,
  GoogleAuthProvider,
  storage,
} from "./../FirebaseConfig/Config.jsx";
import axios from "axios";
import Form from "../Components/Form/Form";
import { GoogleBtn } from "../Components/Buttons/VerButton";
import { useNavigate } from "react-router-dom";

const SignUpComponent = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (form, resetForm) => {
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUser(auth, form.email, form.password);
      const user = userCredential.user;

      await axios.put(`${dbURL}/users/${user.uid}.json`, {
        name: form.name,
        email: form.email,
        id: user.uid,
      });
      localStorage.setItem("user", JSON.stringify(user.uid));
      navigate("/");
      resetForm();
    } catch (error) {
      setError(error.message);
      console.error("Error signing up:", error.message);
    }
  };

  const handleGoogleSignUp = async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({
      prompt: "select_account",
    });

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = {
        name: user.displayName || "",
        email: user.email || "",
        id: user.uid,
      };

      await axios.put(`${dbURL}/users/${user.uid}.json`, userData);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error("Error signing in with Google:", error.message);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 px-8 md:px-24 lg:px-24 gap-12 h-screen justify-center content-start py-24">
      <div className="flex flex-col gap-6">
        <Form
          className="p-24"
          title={"Sign Up"}
          formArr={[
            {
              label: "Name",
              name: "name",
              type: "text",
              value: name,
              onChange: (e) => setName(e.target.value),
            },
            {
              label: "Email",
              name: "email",
              type: "email",
              value: email,
              onChange: (e) => setEmail(e.target.value),
            },
            {
              label: "Password",
              name: "password",
              type: "password",
              value: password,
              onChange: (e) => setPassword(e.target.value),
            },
            {
              label: "Confirm Password",
              name: "confirmPassword",
              type: "password",
              value: confirmPassword,
              onChange: (e) => setConfirmPassword(e.target.value),
            },
            {
              label: "Phone Number",
              name: "phone",
              type: "text",
              placeholder: "07********",
            },
          ]}
          subitBtn={"Sign Up"}
          onSubmit={(form, resetForm) => handleSignUp(form, resetForm)}
          redirect={{
            label: "Have an account?",
            link: {
              label: "login",
              to: "/login",
            },
          }}
        />

        <GoogleBtn onClick={handleGoogleSignUp} className="google-btn">
          Sign Up with Google
        </GoogleBtn>
      </div>
      <img
        src="https://i.pinimg.com/564x/89/d9/8d/89d98d4048d9700df7dda17fdb4c073a.jpg"
        alt="Event"
        className="rounded-lg invisible lg:visible"
        style={{ width: "100%", height: "auto" }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SignUpComponent;
