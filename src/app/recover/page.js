"use client";
import { useState } from "react";
import UserInput from "../components/UserInput/UserInput";
import toast from "react-hot-toast";

export default function Recover() {
  const [username, setUsername] = useState("");
  const [recCode, setRecoveryCode] = useState("");

  const handleSubmit = async (e) => {
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
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      //console.error("Recovery Error:", error);
      toast.error("An error occurred while recovering the account.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Recover Account</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
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
