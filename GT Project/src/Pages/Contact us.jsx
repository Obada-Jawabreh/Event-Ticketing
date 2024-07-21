import Form from "../Components/Form/Form";
import { useState } from "react";

function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSending = "";

  return (
    <div className=" my-24 mx-8 md:mx-24 lg:mx-96">
      <Form
        title={"Contact Us"}
        formArr={[
          {
            label: "Your Name",
            name: "name",
            type: "text",
            onChange: (e) => setName(e.target.value),
          },
          {
            label: "Email",
            name: "email",
            type: "text",
            onChange: (e) => setEmail(e.target.value),
          },
          {
            label: "Your Message",
            name: "msg",
            type: "text",
            onChange: (e) => setMsg(e.target.value),
          },
        ]}
        subitBtn={"Send your message"}
        onSubmit={handleSending}
        withEvent={true}
      />
    </div>
  );
}

export default ContactUs;
