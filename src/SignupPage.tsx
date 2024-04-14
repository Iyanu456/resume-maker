import { useState } from "react";
import { useMutation } from "react-query";
import FloatingLabel from "./components/floatingLabel";
import FloatingPassword from "./components/floatingPassword";

const apiUrl = import.meta.env.BACKEND_API_URL;

const SigninLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(true);

  const signupOrLoginMutation = useMutation(
    async (data: { email: string; password: string }) => {
      const endpoint = isNewUser ? "/signup" : "/login";
      const response = await fetch(`http://${apiUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response.json();
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signupOrLoginMutation.mutateAsync({ email, password }).then((response) => {
      console.log("Server response:", response);
    });
  };

  

  return (
    <div className="grid place-items-center h-screen">
      <form
        className="w-[85vw] flex flex-col gap-3 md:w-[320px] h-[fit-content] mb-[-2em]"
        onSubmit={handleSubmit}
      >
        <img src="/Sketchcv_logo.svg" alt="" className="mx-auto mb-4  max-w-[200px] max-h-[200px]" />
        <div className="mb-2">
          <h3 className="text-[1.5em] font-semibold text-center poppins">{isNewUser === true ? "Create your account" : "Welcome back"}</h3>
          {/*<p className="text-sm text-[grey] text-center">{isNewUser === true ? "Sign up to get started" : "Welcome back enter your details"}</p>*/}
        </div>

        <FloatingLabel
          value={email}
          label="Email address"
          type="email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
        />

        <FloatingPassword
          value={password}
          label="Password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
        />
        { !isNewUser && <button className="font-semibold text-sm text-right text-[#007bff]">Forgot password? </button>}

        {email !== "" && password !== "" ? (
          <button className="mt-2 px-2 py-3 w-[100%] rounded-[8px] bg-[#007bff] text-white" type="submit">
            Continue
          </button>
        ) : (
          <button className="mt-2 px-2 py-3 w-[100%] rounded-[8px] bg-[#007bff] text-white">Continue</button>
        )}
        
        {
          isNewUser === false ?
            <button className=" text-sm" onClick={() => setIsNewUser(!isNewUser)}>
              Don't have an account <span className="text-[#007bff]">Signup</span> 
            </button> : 
            <button className=" text-sm" onClick={() => setIsNewUser(!isNewUser)}>
              Have an account <span className="text-[#007bff] font-semibold">Sign in</span> 
            </button>
        }

      </form>
    </div>
  );
};

export default SigninLogin;
