import { useState } from "react";
import { useMutation } from "react-query";
import { QueryClient, QueryClientProvider } from 'react-query';
import FloatingLabel from "./components/floatingLabel";
import FloatingPassword from "./components/floatingPassword";

const apiUrl = import.meta.env.BACKEND_API_URL;
const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
    <div className="grid place-items-center h-screen">
      <form
        className="border-2 py-[1em] px-[1.4em] rounded-lg  w-[85vw] flex flex-col gap-3 md:w-[350px] h-[fit-content] text-center"
        onSubmit={handleSubmit}
      >
        <img src="/vite.svg" alt="" className="mx-auto  max-w-[50px] max-h-[50px]" />
        <div className="mb-2">
          <h3 className="text-[1.3em]">{isNewUser === true ? "Sign up" : "Welcome back"}</h3>
          <small className="text-sm text-[grey]">{isNewUser === true ? "Sign up to get started" : "Welcome back enter your details"}</small>
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
        { !isNewUser && <button className="font-semibold text-sm text-right text-[#790cdf]">Forgot password? </button>}

        {email !== "" && password !== "" ? (
          <button className="mt-2 font-semibold px-2 py-3 w-[100%] rounded-[8px] bg-[#790cdf] text-white" type="submit">
            Continue
          </button>
        ) : (
          <button className="mt-2 font-semibold px-2 py-3 w-[100%] rounded-[8px] bg-[#790cdf] text-white">Continue</button>
        )}

        {
          isNewUser === false ?
            <button className="font-semibold text-sm text-center" onClick={() => setIsNewUser(!isNewUser)}>
              Don't have an account <span className="text-[#6816b6]">Signup</span> 
            </button> : 
            <button className="font-semibold text-sm text-center" onClick={() => setIsNewUser(!isNewUser)}>
              Have an account <span className="text-[#6816b6]">Sign in</span> 
            </button>
        }

      </form>
    </div>
    </QueryClientProvider>
  );
};

export default SigninLogin;
