import { useState } from "react";
//import { useHistory } from "react-router-dom";
import FloatingLabel from "./components/floatingLabel";
import FloatingPassword from "./components/floatingPassword";
//import { ReactComponent as GarbinsoLogo } from "./garbinso-logo-dark.svg";
//import { ReactComponent as EyeIcon } from "./eye.svg";
//import { ReactComponent as EyeSlashIcon } from "./eye-slash.svg";
//import { Link } from "react-router-dom";

const SigninLogin: React.FC = () => {
  //const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted")
  };

  return (
    <div className="grid place-items-center h-screen">
      <form
        className="border-[1px] shadow-sm rounded-lg py-[2em] px-[1.6em] w-[85vw] flex flex-col gap-3 md:w-[380px] h-[fit-content] text-center"
        onSubmit={handleSubmit}
      >
        <img src="/vite.svg" alt="" className="mx-auto pb-4 max-w-[50px] max-h-[50px]" />
        <div className="mb-2">
          <h3 className="text-[1.5em]">{isNewUser === true ? "Sign up" : "Welcome back"}</h3>
          <small className="text-sm text-[grey]">{isNewUser === true ? "Sign up to get started" : "Welcome back enter your details"}</small>
        </div>

        <FloatingLabel
          className="form-control"
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
        { !isNewUser && <button className="font-semibold text-sm text-right text-[#790cdf]">Forgot password? </button>}

        {email !== "" && password !== "" ? (
          <button className="mt-2 font-semibold px-2 py-4 w-[100%] rounded-[8px] bg-[#790cdf] text-white" type="submit">
            Continue
          </button>
        ) : (
          <button className="mt-2 font-semibold px-2 py-4 w-[100%] rounded-[8px] bg-[#790cdf] text-white">Continue</button>
        )}

        {
          isNewUser === false ?
            <button className="font-semibold mb-4 text-sm text-center" onClick={() => setIsNewUser(!isNewUser)}>
              Don't have an account <span className="text-[#6816b6]">Signup</span> 
            </button> : 
            <button className="font-semibold mb-4 text-sm text-center" onClick={() => setIsNewUser(!isNewUser)}>
              Have an account <span className="text-[#6816b6]">Sign in</span> 
            </button>
        }

      </form>
    </div>
  );
};

export default SigninLogin;
