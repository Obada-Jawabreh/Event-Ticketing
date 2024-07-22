import React, { useState, useEffect } from "react";
import image1 from "./../images/Ticket1.png";
import image2 from "./../images/Ticket2.png";
import image3 from "./../images/Ticket3.png";
import signup from "../images/signup3.png";
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
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isActive, setActive] = useState(true);

<<<<<<< HEAD
=======
  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^07\d{8}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validatePassword = (password) => {
    // Example password validation: at least 8 characters, including 1 uppercase, 1 lowercase, and 1 digit
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };

>>>>>>> f60983380e7cd75d68178adb65b54064a9188dd5
  const handleSignUp = async (form, resetForm) => {
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!validatePhoneNumber(form.phone)) {
      setError("Phone number must start with 07 and be 10 digits long");
      return;
    }

    if (!validatePassword(form.password)) {
      setError("Password must be at least 8 characters long, including 1 uppercase letter, 1 lowercase letter, and 1 digit");
      return;
    }

    try {
<<<<<<< HEAD
      const userCredential = await createUser(
        auth,
        form.email,
        form.password,
        form.phone,
        isActive
      );
=======
      const userCredential = await createUser(auth, form.email, form.password, form.phone, isActive);
>>>>>>> f60983380e7cd75d68178adb65b54064a9188dd5
      const user = userCredential.user;

      await axios.put(`${dbURL}/users/${user.uid}.json`, {
        name: form.name,
        email: form.email,
        id: user.uid,
        phone: form.phone,
        isActive: true,
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
        phone: user.phoneNumber || "",
      };
      console.log(user);
      await axios.put(`${dbURL}/users/${user.uid}.json`, userData);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error("Error signing in with Google:", error.message);
    }
  };

  const ImageSlider = () => {
    const images = [image1, image2, image3];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 1800);

      return () => clearInterval(interval);
    }, [images.length]);

    return (
      <img
        src={images[currentImageIndex]}
        alt="Event"
        className="rounded-lg invisible lg:visible"
        style={{ width: "80%", height: "auto" }}
      />
    );
  };

  return (
<<<<<<< HEAD
    <div className="grid grid-cols-1 lg:grid-cols-2 px-8 md:px-24 lg:px-44 gap-12  justify-center content-start py-24">
      <div className="bg-second-dark bg-gradient-prim p-4 md:p-16 rounded-xl">
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
                value: phone,
                onChange: (e) => {
                  setPhone(e.target.value);
                },
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
=======
    <div className="grid grid-cols-1 lg:grid-cols-2 px-8 md:px-24 lg:px-24 gap-12 h-screen justify-center content-start py-10">
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
              value: phone,
              onChange: (e) => setPhone(e.target.value),
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
>>>>>>> f60983380e7cd75d68178adb65b54064a9188dd5

          <GoogleBtn onClick={handleGoogleSignUp} className="google-btn">
            Sign Up with Google
          </GoogleBtn>
        </div>
      </div>
      {/* <ImageSlider /> */}
      <div className=" ">
        <img
          src={signup}
          alt="Event"
          className="rounded-lg  invisible lg:visible"
          style={{ width: "auto", height: "100%" }}
        />
      </div>
<<<<<<< HEAD
=======
      <ImageSlider />
>>>>>>> f60983380e7cd75d68178adb65b54064a9188dd5
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SignUpComponent;
