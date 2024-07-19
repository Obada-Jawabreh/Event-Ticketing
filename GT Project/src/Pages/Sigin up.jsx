import Form from "../Components/Form/Form";
import { GoogleBtn, FbBtn } from "../Components/Buttons/VerButton";

function SiginUp() {
  const onSubmitHandler = (form, callback) => {
    console.log(form);
  };
  return (
    <div className="grid grid-cols-2 gap-12 px-52 h-screen justify-center content-start pt-24">
      {/* <Form title={""} /> */}
      <div className="flex flex-col gap-6">
        <Form
          className="p-24"
          title={"SignUp"}
          //inputs
          formArr={[
            {
              label: "Email",
              name: "email",
              type: "text",
            },
            {
              label: "Password",
              name: "password",
              type: "password",
            },
            {
              label: "Confirm password",
              name: "ConfirmPassword",
              type: "password",
            },
          ]}
          subitBtn={"Login"}
          onSubmit={onSubmitHandler}
          redirect={{
            label: "Have an account?",
            link: {
              label: "login",
              to: "/login",
            },
          }}
        />

        <GoogleBtn>SingUp with Google</GoogleBtn>
        <FbBtn>SingUp with Google</FbBtn>
      </div>
      <img
        src="https://i.pinimg.com/564x/89/d9/8d/89d98d4048d9700df7dda17fdb4c073a.jpg"
        alt="Event"
        className="rounded-lg"
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}

export default SiginUp;
