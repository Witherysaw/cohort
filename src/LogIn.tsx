import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import logo from "./assets/TailwingLogo.png";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "./index.css";

export default function LogIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError(""); // Reset error message
    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save token if needed (for authentication persistence)
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userId", data.user_id);
        navigate("/AdminPanel");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error, please try again later.");
    }
  };

  return (
    <div className="w-full h-screen flex">
      {/* Left half of the screen */}
      <div className="w-1/2 h-full flex flex-col bg-[#d4d4d4] items-center justify-center"></div>

      {/* Right half - login form */}
      <div className="w-1/2 h-full bg-[#ffffff] flex flex-col p-20 justify-center">
        <div className="w-full flex flex-col max-w-[450px] mx-auto">
          {/* Header */}
          <div className="w-full flex flex-col mb-10 text-black">
            <h3 className="text-4xl font-bold mb-2">Admin Login</h3>
            <p className="text-lg mb-4">Enter your credentials to continue.</p>
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Input fields */}
          <div className="w-full flex flex-col mb-6">
            <p className="pb-3 text-lg">Username</p>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full text-[#000000] py-2 mb-4 p-4 bg-transparent border-2 rounded-md border-[#0e4648] focus:outline-none focus:border-[#1c7da3]"
            />
            <p className="pb-3 text-lg">Password</p>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-[#000000] py-2 mb-4 p-4 bg-transparent border-2 rounded-md border-[#0e4648] focus:outline-none focus:border-[#1c7da3]"
            />
          </div>

          {/* Login button */}
          <div className="w-full flex flex-col mb-4">
            <button
              className="w-full h-15 bg-transparent border transition-all duration-300 ease-in-out border-[#2a90f7] text-[#2a90f7] my-2 font-semibold rounded-md p-4 text-center flex items-center justify-center cursor-pointer hover:bg-[#2a90f7] hover:text-white text-xl"
              onClick={handleLogin}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
