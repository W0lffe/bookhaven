"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import UserInput from "../components/UserInput/UserInput";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          expire: !stayLoggedIn,
        }),
      });

      //console.log(response)
      const data = await response.json();
      //console.log(data)

      if (data.message && response.status === 200) {
        toast.success(data.message);
        setTimeout(() => {
          router.push("/dashboard")
        }, 750);
        // Redirection to be decided later
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="flex flex-col items-center justify-center p-4 mt-10">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-2">
          
          <UserInput 
            type="text" 
            label="Username" 
            stateValue={username} 
            setState={setUsername} 
          />

          <UserInput 
            type="password" 
            label="Password" 
            stateValue={password} 
            setState={setPassword} 
          />

          <div className="flex items-center space-x-2">
            <input
              id="stayLoggedIn"
              type="checkbox"
              checked={stayLoggedIn}
              onChange={(e) => setStayLoggedIn(e.target.checked)}
            />
            <label htmlFor="stayLoggedIn" className="text-sm">
              Stay logged in
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
  );
}

