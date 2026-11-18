"use client";
import { useState } from "react";
import UserInput from "../components/UserInput/UserInput";
import { toast } from "react-hot-toast";
import NavButton from "../components/NavButton/NavButton";

/**
 * Register component handles user registration and displays a success message
 * with a recovery code upon successful sign-up.
 * 
 * @returns {JSX.Element} The rendered registration page or success view.
 */
export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  /**
   * Handles the form submission for user registration.
   * Sends a POST request to the registration API and updates the success state.
   * 
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      console.log("Response from backend:", data);

      if (response.ok) {
        // Update success state with the recovery code received from the backend
        setSuccess(data.recovery);
        toast.success(data.message);
        // You can add redirect or additional logic here
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      //console.error("Error during registration:", error);
      toast.error("An error occurred during registration.");
    }
  };

  // Conditional rendering: Show the success state if the registration was successful
  if(success){
    return(
       <div className="flex flex-col mt-10 items-center justify-center text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to BookHaven!</h1>
          <p className="mb-4">Here is your account's <strong>recovery code</strong>. Please store this code in case you lose your password, so you are able to recover your account.</p>
          <fieldset className="border">
            <legend>Recovery Code</legend>
            <p className="text-xl font-bold">{success}</p>
          </fieldset>
          <div className="mt-6">
            <NavButton {...{path: "/", text:"Go To Home", icon: false}}/>
          </div>
        </div>
    )
  }

  // Default view: Render the registration form
  return (
    <div className="flex h-[calc(100vh-16px)] flex-col items-center mt-10 gap-10">
      <h1 className="text-3xl font-bold text-center">Register</h1>
      <form onSubmit={handleSubmit}>
        <UserInput
          type="text"
          stateValue={username}
          setState={setUsername}
          label="Username"
        />
        <UserInput
          type="password"
          stateValue={password}
          setState={setPassword}
          label="Password"
        />
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Register
        </button>
      </form>
    </div>
  );
}