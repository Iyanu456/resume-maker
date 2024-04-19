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
    <div>
       <div className="nav flex py-[1.2em] px-[2em] absolute z-20 right-0 left-0 top-0 bottom-auto border-b-2">
                <p className="text-[1.2em] my-auto font-bold">Sketch.cv</p>
      
            </div>
    <div className="grid place-items-center h-screen">
      <form
        className="w-[85vw] flex flex-col gap-3 md:w-[320px] h-[fit-content] mb-[-2em]"
        onSubmit={handleSubmit}
      >
        {/*<img src="/Sketchcv_logo.svg" alt="" className="mx-auto mb-4  max-w-[200px] max-h-[200px]" />*/}
        <div className="mb-2">
          <h3 className="text-[1.75em] font-semibold text-center poppins">{isNewUser === true ? "Create your account" : "Welcome back"}</h3>
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
          <button className="mt-2 px-2 py-3 w-[100%] rounded-[8px] bg-[#1f1f1f] text-white" type="submit">
            Continue
          </button>
        ) : (
          <button className="mt-2 px-2 py-3 w-[100%] rounded-[8px] bg-[#1f1f1f] text-white">Continue</button>
        )}
        
        {
          isNewUser === false ?
            <button className=" text-sm" onClick={() => setIsNewUser(!isNewUser)}>
              Don't have an account? <span className="text-[#1f1f1f] font-bold">Signup</span> 
            </button> : 
            <button className=" text-sm" onClick={() => setIsNewUser(!isNewUser)}>
              Have an account? <span className="text-[#1f1f1f] font-bold">Sign in</span> 
            </button>
        }

      </form>
    </div>
    </div>
  );
};

export default SigninLogin;
