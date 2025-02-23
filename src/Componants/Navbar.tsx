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
import "../index.css";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const navigate = useNavigate();

  const suggestions = [
    "Home",
    "Solutions",
    "Industries",
    "Experiences",
    "Contact Us",
    "Contact please",
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter suggestions based on input
    if (query.trim() !== "") {
      const filtered = suggestions.filter((item) =>
        item.toLowerCase().startsWith(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const routes = {
      home: "/",
      solutions: "/Solutions",
      industries: "/Industries",
      experiences: "/Experiences",
      "contact us": "/ContactUs",
    };

    const route = routes[suggestion.toLowerCase() as keyof typeof routes];
    if (route) {
      navigate(route);
    }
    setSearchQuery("");
    setFilteredSuggestions([]);
  };

  return (
    <header
      className="absolute w-full top-0 flex justify-between
        items-center text-black py-4 px-8
        md:px-16 bg-white drop-shadow-md z-10"
    >
      <a className="" href="">
        <img
          src="https://i.ibb.co/J20Tf76/AIsolutions-Logo.png"
          alt=""
          className=" w-52 h-13
          hover:scale-105 transition-all"
        ></img>
      </a>

      <ul
        className="hidden xl:flex items-center 
        gap-12 font-semibold text-base"
      >
        <li
          className="p-3  hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer"
          onClick={() => navigate("/")}
        >
          Home
        </li>
        <li
          className="p-3 hover:bg-sky-400 *:jover: hover:text-white rounded-md transition-all cursor-pointer"
          onClick={() => navigate("/Solutions")}
        >
          Solutions
        </li>
        <li className="p-3 hover:bg-sky-400 *:jover: hover:text-white rounded-md transition-all cursor-pointer">
          About Us
        </li>
        <li className="list-none z-20 w-90 text-center p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer relative">
          <p
            className=""
            onMouseEnter={() => setIsSubMenuOpen(true)}
            onMouseLeave={() => setIsSubMenuOpen(false)}
          >
            Experiences
            <i className="bx bx-chevron-down relative left-1 top-0.5"></i>
          </p>

          {isSubMenuOpen && (
            <div
              className="absolute left-0 z-10 w-full h-full z-11 bg-transparent"
              onMouseEnter={() => setIsSubMenuOpen(true)}
              onMouseLeave={() => setIsSubMenuOpen(false)}
            ></div>
          )}

          {/* Submenu should also stay open while hovering over it */}
          {isSubMenuOpen && (
            <div
              onMouseEnter={() => setIsSubMenuOpen(true)}
              onMouseLeave={() => setIsSubMenuOpen(false)}
              className={` absolute left-0 top-12 z-20 w-full shadow-md bg-white flex flex-col items-center gap-2 rounded-md font-semibold text-lg text-black transform transition-transform ${
                isSubMenuOpen
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
              style={{ transition: " opacity 0.3s ease" }}
            >
              <li className="list-none w-full text-center p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer">
                Ratings
              </li>
              <li className="list-none w-full text-center p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer">
                Blogs
              </li>
              <li className="list-none w-full text-center p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer">
                Gallery
              </li>
            </div>
          )}
        </li>

        <li
          className="p-3 hover:bg-sky-400 *:jover: hover:text-white rounded-md transition-all cursor-pointer"
          onClick={() => navigate("/ContactUs")}
        >
          Contact Us
        </li>
      </ul>

      <div className="relative hidden md:flex items-center justify-center gap-3">
        <i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search..."
          className="py-2 pl-10 rounded-xl border-2 border-blue-300 focus:bg-slate-100 focus:outline-sky-500"
        />
        {filteredSuggestions.length > 0 && (
          <ul className="absolute top-10 left-0 right-0 bg-white shadow-lg mt-1 rounded-md z-10">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-2 hover:bg-blue-200 cursor-pointer shadow-lg mt-1 rounded-md"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <i
        className="bx bx-menu xl:hidden block text-5xl cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      ></i>
      <div
        className={`absolute xl:hidden top-20 z-10 left-0 w-full shadow-md bg-white flex flex-col items-center gap-2 font-semibold text-lg transform transition-transform ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ transition: " opacity 0.3s ease" }}
      >
        <li
          className="list-none w-full text-center p-3 hover:bg-sky-400 hover:text-white transition-all cursor-pointer"
          onClick={() => navigate("/")}
        >
          Home
        </li>
        <li className="list-none w-full text-center p-3 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
          Solutions
        </li>
        <li className="list-none w-full text-center p-3 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
          Industries
        </li>
        <li className="list-none w-full text-center p-3 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
          <p onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}>
            Experiences{" "}
            <i
              style={{ transition: "opacity 0.3s ease" }}
              className={`relative left-1 top-0.5 ${
                isSubMenuOpen ? "bx bx-up-arrow" : "bx bx-down-arrow"
              }`}
            ></i>
          </p>
        </li>
        <div
          className={`relative xl:hidden z-10 left-0 w-full shadow-md bg-slate-300 flex flex-col items-center gap-1 font-semibold text-lg transform transition-transform ${
            isSubMenuOpen ? "opacity-100 pointer-events-auto" : "hidden"
          }`}
          style={{ transition: "opacity 0.3s ease" }}
        >
          <li className="list-none w-full text-center p-3 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
            Home
          </li>
          <li className="list-none w-full text-center p-3 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
            Solutions
          </li>
          <li className="list-none w-full text-center p-3 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">
            Industries
          </li>
        </div>
        <li
          className="list-none w-full text-center p-3 hover:bg-sky-400 hover:text-white transition-all cursor-pointer"
          onClick={() => navigate("/ContactUs")}
        >
          Contact Us
        </li>
      </div>
    </header>
  );
}
