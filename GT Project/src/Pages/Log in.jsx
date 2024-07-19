import { FbBtn, GoogleBtn } from "../Components/Buttons/VerButton";
import Form from "../Components/Form/Form";

function Login() {
  // eslint-disable-next-line no-unused-vars
  const onSubmitHandler = (form, callback) => {
    console.log(form);
  };

  return (
    <div className="grid grid-cols-2 gap-12 px-52 h-screen justify-center content-start pt-24">
      <div className="flex flex-col gap-6">
        <Form
          title={"Login"}
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
          ]}
          subitBtn={"Login"}
          onSubmit={onSubmitHandler}
          redirect={{
            label: "Don't have an account?",
            link: {
              label: "Register",
              to: "/signup",
            },
          }}
        />
        <GoogleBtn>SingUp with Google</GoogleBtn>
        <FbBtn>SingUp with Google</FbBtn>
      </div>
      <div className="">
        <img
          src="https://i.pinimg.com/564x/89/d9/8d/89d98d4048d9700df7dda17fdb4c073a.jpg"
          alt="Event"
          className="rounded-lg "
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
}

export default Login;
