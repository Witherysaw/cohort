import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "../index.css";

export default function CustomFooter() {
  const navigate = useNavigate();

  return (
    <footer className="relative z-20">
      <div className="w-full h-[130px]"></div>
      <div className="w-full min-h-[200px] bg-blue-600 text-white flex justify-center items-center rounded-tr-full">
        <div className="gap-6 p-12 flex flex-col absolute top-[40px] w-[1000px] min-h-[300px] bg-sky-200 text-black justify-center items-center rounded-xl">
          <h1 className="text-3xl font-semibold">Your Problem, We Solve</h1>
          <p className="font-lg text-center">
            We provide innovative solutions tailored to your needs. Whether
            you're facing complex challenges or looking for new opportunities,
            our expertise ensures efficiency, reliability, and success in every
            step of the journey.
          </p>
          <button
            className="text-white mt-3 px-6 py-3 text-2xl font-semibold bg-blue-600 rounded-lg shadow-md hover:bg-blue-500 hover:text-black transition"
            onClick={() => navigate("/ContactUs")}
          >
            Contact Us →
          </button>
        </div>
      </div>
      <div className="px-52 flex-row w-full min-h-[250px] bg-blue-600 text-white flex justify-between items-center">
        <div className="gap-3 flex flex-col w-80">
          <img
            src="https://i.ibb.co/J20Tf76/AIsolutions-Logo.png"
            alt=""
            className=" w-52 h-13 
          hover:scale-105 transition-all"
          ></img>
          <p>
            AI Solutions Co. Ltd. 123 Innovation Drive, Tech City, TX 75001, USA
          </p>
          <p>thureinrichard3@gmail.com</p>
          <div className="flex flex-row gap-2">
            <a href="#" className="text-white text-2xl">
              <i className="bx bxl-facebook"></i>
            </a>
            <a href="#" className="text-white text-2xl">
              <i className="bx bxl-linkedin"></i>
            </a>
            <a href="#" className="text-white text-2xl">
              <i className="bx bxl-pinterest"></i>
            </a>
            <a href="#" className="text-white text-2xl">
              <i className="bx bxl-instagram"></i>
            </a>
            <a href="#" className="text-white text-2xl">
              <i className="bx bxl-youtube"></i>
            </a>
          </div>
        </div>
        <div className="flex flex-col bg-slate-300 w-80 h-20">
          <div className=""></div>
        </div>
      </div>
    </footer>
  );
}
