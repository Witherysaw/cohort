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
import Navbar from "./Componants/Navbar";

export default function ContactUs() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <div className="absolute w-full min-h-screen bg-blue-50 ">
      {/* bg-gradient-to-r from-[#ffffff] to-emerald-400 */}
      <Navbar></Navbar>
      <div className="relative w-[850px] h-screen overflow-hidden shadow-xl">
        <img
          className="opacity-85 bg-slate-600 w-[850px] flex z-1"
          src="https://i.ibb.co/5gd8k250/contactuspagebg.png"
          alt="contactuspagebg"
        ></img>
      </div>
      <div className="absolute top-[105px] right-20 w-[600px] h-[550px] rounded-2xl shadow-2xl bg-white p-6 pl-12">
        <h1 className="text-3xl font-semibold">Contact Form</h1>
        <div className="flex flex-col p-6 pl-0 pt-2">
          <div className="flex flex-row gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="flex"> Name </h2>
              <input className="flex text-[#000000] py-2 mb-4 p-4 bg-transparent border-2 rounded-md border-[#0c182f] focus:outline-none focus:border-[#1c7da3]"></input>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="flex"> Phone </h2>
              <input className="flex text-[#000000] py-2 mb-4 p-4 bg-transparent border-2 rounded-md border-[#0c182f] focus:outline-none focus:border-[#1c7da3]"></input>
            </div>
          </div>
          <div className="flex flex-row gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="flex"> Email </h2>
              <input className="flex text-[#000000] py-2 mb-4 p-4 bg-transparent border-2 rounded-md border-[#0c182f] focus:outline-none focus:border-[#1c7da3]"></input>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="flex"> Company </h2>
              <input className="flex text-[#000000] py-2 mb-4 p-4 bg-transparent border-2 rounded-md border-[#0c182f] focus:outline-none focus:border-[#1c7da3]"></input>
            </div>
          </div>
          <div className="flex flex-row gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="flex"> Country </h2>
              <input className="flex text-[#000000] py-2 mb-4 p-4 bg-transparent border-2 rounded-md border-[#0c182f] focus:outline-none focus:border-[#1c7da3]"></input>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="flex"> Job Title </h2>
              <input className="flex text-[#000000] py-2 mb-4 p-4 bg-transparent border-2 rounded-md border-[#0c182f] focus:outline-none focus:border-[#1c7da3]"></input>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col gap-3">
              <h2 className="flex"> Job Detials </h2>
              <input className=" w-[470px] h-20 flex text-[#000000] py-2 mb-4 p-4 bg-transparent border-2 rounded-md border-[#0c182f] focus:outline-none focus:border-[#1c7da3]"></input>
            </div>
          </div>
          <div className="flex">
            <button className="px-6 py-2 text-white text-lg font-semibold bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition">
              Explore Now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
