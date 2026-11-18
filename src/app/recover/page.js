"use client";
import { useState } from "react";
import UserInput from "../components/UserInput/UserInput";
import toast from "react-hot-toast";
import NavButton from "../components/NavButton/NavButton";

export default function Recover() {
  const [username, setUsername] = useState("");
  const [recCode, setRecoveryCode] = useState("");
  const [isRecMatch, setIsRecMatch] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newRecCode, setNewRecCode] = useState("");
  
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password.trim() !== confirmPassword.trim()) {
        toast.error("Passwords do not match");
        return;
      }
      
      try {
        const response = await fetch("/api/auth/recover/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
          setNewRecCode(data.recCode)
          setIsRecMatch(false);
          toast.success(data.message);
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        //console.error("Password reset error:", error);
        toast.error("Something went wrong...");
      }
  }

   const handleVerifyCode = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("/api/auth/recover", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, recCode }),
        });

        const data = await response.json();

        if (response.ok) {
          setIsRecMatch(true);
          toast.success(data.message);
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        //console.error("Recovery Error:", error);
        toast.error("Something went wrong...");
      }
  }

  if(newRecCode){
    return(
           <div className="flex flex-col mt-10 items-center justify-center text-center">
              <h1 className="text-2xl font-bold mb-4">Password updated!</h1>
              <p className="mb-4">Here is your account's <strong>recovery code</strong>. Please store this code in case you lose your password, so you are able to recover your account.</p>
              <fieldset className="border">
                <legend>Recovery Code</legend>
                <p className="text-xl font-bold">{newRecCode}</p>
              </fieldset>
              <div className="mt-6">
                <NavButton {...{path: "/", text:"Go To Home", icon: false}}/>
              </div>
            </div>
        )
  }

  if (isRecMatch) {
    return (
      <div className="flex flex-col items-center justify-center p-4 mt-10">
        <h1 className="text-2xl font-bold mb-4 text-center">Recover Account</h1>
        <form onSubmit={handleResetPassword} className="space-y-4 w-full max-w-md">
          <UserInput
            type="password"
            label="New password"
            stateValue={password}
            setState={setPassword}
          />
          <UserInput
            type="password"
            label="Type your password again"
            stateValue={confirmPassword}
            setState={setConfirmPassword}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Recover Account</h1>
      <form onSubmit={handleVerifyCode} className="space-y-4 w-full max-w-md">
        <UserInput
          type="text"
          label="Username"
          stateValue={username}
          setState={setUsername}
        />
        <UserInput
          type="text"
          label="Recovery Code"
          stateValue={recCode}
          setState={setRecoveryCode}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

