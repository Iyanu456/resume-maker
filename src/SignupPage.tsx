import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom"; // Import useHistory hook
import FloatingLabel from "./components/floatingLabel";
import FloatingPassword from "./components/floatingPassword";
import HorizontalLoader from "./components/HorizontalLoader";

//const apiUrl = import.meta.env.REACT_APP_BACKEND_API_URL;

const SigninLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(true);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate(); // Initialize useHistory hook

  const signupOrLoginMutation = useMutation(
    async (data: { email: string; password: string }) => {
      const endpoint = isNewUser ? "/signup" : "/login";
      const response = await fetch((`https://express-backend-9bou.onrender.com${endpoint}`), {
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
    if (email === "" || password === "") {
      setLoader(false)
      return null;
    }
    setLoader(true);
    await signupOrLoginMutation.mutateAsync({ email, password }).then((response) => {
      console.log("Server response:", response);
      if (response.token && response.status === "success") {
        setLoader(false);
        navigate("/resume"); // Redirect to /resume route
      }
      if (response.message === "email already exists") {
        setLoader(false)
        setIsNewUser(false);
      }

      if (response.status === "failed") {
        setLoader(false);
      }

    });
  };

  

  return (
    <>
    {loader && <HorizontalLoader />}
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
        { !isNewUser && <button type="button" className="font-bold text-sm text-right text-[#1f1f1f]">Forgot password? </button>}

        {email !== "" && password !== "" ? (
          <button className="mt-2 px-2 py-3 w-[100%] rounded-[8px] bg-[#1f1f1f] text-white" type="submit">
            Continue
          </button>
        ) : (
          <button type="submit"className="mt-2 px-2 py-3 w-[100%] rounded-[8px] bg-[#1f1f1f] text-white">Continue</button>
        )}
        
        {
          isNewUser === false ?
            <button type="button" className=" text-sm" onClick={() => setIsNewUser(!isNewUser)}>
              Don't have an account? <span className="text-[#1f1f1f] font-bold">Signup</span> 
            </button> : 
            <button type="button" className=" text-sm" onClick={() => setIsNewUser(!isNewUser)}>
              Have an account? <span className="text-[#1f1f1f] font-bold">Sign in</span> 
            </button>
        }

      </form>
    </div>
    </div>
    </>
  );
};

export default SigninLogin;
