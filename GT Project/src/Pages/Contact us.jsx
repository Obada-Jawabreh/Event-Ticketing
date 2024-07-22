import axios from "axios";
import Form from "../Components/Form/Form";
import { useState, useEffect } from "react";
import { dbURL } from "../FirebaseConfig/Config";

function ContactUs() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMsg] = useState("");

  const handleSending = async (event, form, resetForm) => {
    event.preventDefault();
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log(userData);

    if (userData) {
      console.log("User data found in local storage:", userData);

      const messageData = {
        userName: form.name,
        userEmail: form.email,
        userMsg: form.msg,
      };

      try {
        await axios.post(`${dbURL}/messages.json`, messageData);
        console.log("Message sent successfully:", messageData);
        resetForm();
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      console.log("No user data found in local storage. Please log in.");
    }
  };

  return (
    <div className="my-24 mx-8 md:mx-24 lg:mx-96">
      <Form
        title={"Contact Us"}
        formArr={[
          {
            label: "Your Name",
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
            label: "Your Message",
            name: "msg",
            type: "text",
            value: message,
            onChange: (e) => setMsg(e.target.value),
          },
        ]}
        subitBtn={"Send your message"}
        onSubmit={(event, form, resetForm) =>
          handleSending(event, form, resetForm)
        }
        withEvent={true}
      />
    </div>
  );
}

export default ContactUs;
