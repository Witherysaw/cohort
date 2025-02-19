import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";

export default function App() {
  return (
    <div>
      <div className="bg-white pt-4 pr-8 pb-4 pl-8"></div>
      <nav className="w-full">
        <div className="flex w-full justify-between max-w-screen-2xl md:flex-row mt-auto mr-auto mb-auto ml-auto">
          <a
            href="#"
            className="text-gray-600 text-center mr-6 font-medium text-base"
          >
            Product
          </a>
          <a
            href="#"
            className="text-gray-600 text-center mr-6 font-medium text-base"
          >
            Features
          </a>
          <a
            href="#"
            className="text-gray-600 text-center font-medium text-base"
          >
            Pricing
          </a>
        </div>
        <div className="flex flex-row justify-center items-center order-first md:order-none">
          <img
            alt=""
            src="https://res.cloudinary.com/speedwares/image/upload/v1659284687/windframe-logo-main_daes7r.png"
            className="w-12 md:w-16"
          />
        </div>
        <div className="flex flex-row bg-white justify-center items-center md:m-0 hidden md:flex">
          <a
            href="#"
            className="text-gray-600 text-center mr-6 font-medium text-base"
          >
            About Us
          </a>
          <a
            href="#"
            className="text-gray-600 text-center mr-6 font-medium text-lg"
          >
            Sign In
          </a>
          <a href="#" className="text-gray-600 text-center font-medium text-lg">
            Sign Up
          </a>
        </div>
        <div className="md:hidden flex ml-auto items-center">
          <div className="outline-none mobile-menu-button">
            <svg
              id="Windframe_qx-c59XfxVd"
              fill="none"
              strokelinecap="round"
              strokelinejoin="round"
              strokewidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-gray-500 hover:text-green-500"
            >
              <path id="Windframe_Pdh34kVkJlM" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        </div>
        <div className="hidden md:hidden mobile-menu">
          <div>
            <div className="flex flex-col">
              <a
                href="#"
                fontfamily="Raleway"
                className="text-gray-600 text-center mt-2 font-medium text-base"
              >
                Product
              </a>
              <a
                href="#"
                fontfamily="Raleway"
                className="text-gray-600 text-center mt-2 font-medium text-base"
              >
                Features
              </a>
              <a
                href="#"
                fontfamily="Raleway"
                className="text-gray-600 text-center mt-2 font-medium text-base"
              >
                Pricing
              </a>
              <a
                href="#"
                fontfamily="Raleway"
                className="text-gray-600 text-center mt-2 font-medium text-base"
              >
                About Us
              </a>
              <a
                href="#"
                fontfamily="Raleway"
                className="text-gray-600 text-center mt-2 font-medium text-lg"
              >
                Sign In
              </a>
              <a
                href="#"
                fontfamily="Raleway"
                className="text-gray-600 text-center mt-2 font-medium text-lg"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div>
        <section></section>
      </div>
    </div>
  );
}
