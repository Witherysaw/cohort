import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "./index.css";
import Navbar from "./Componants/Navbar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Home() {
  const percentage = 30; // Example percentage

  return (
    <div className="relative min-h-screen">
      {/* Navbar Always on Top */}
      <div className="relative z-20">
        <Navbar />
      </div>
      {/* Video Background (Only Covers First Section) */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden -z-10">
        <iframe
          className="w-full h-[140%] object-cover"
          src="https://www.youtube.com/embed/rgRb-yNmfOc?autoplay=1&loop=1&mute=1&playlist=rgRb-yNmfOc&controls=0&disablekb=1&modestbranding=1&rel=0&showinfo=0"
          frameBorder="0"
          allow="autoplay"
        ></iframe>
      </div>
      {/* Content Overlay (First Section) */}
      <div className="relative z-10 px-20 flex flex-col items-start justify-center min-h-screen text-white text-left bg-black bg-opacity-50">
        <h1 className="text-5xl font-bold">Your Trusted AI Solutions</h1>
        <p className="mt-4 mr-[700px] text-lg text-justify">
          Unlock the power of AI with our cutting-edge technology. With our
          solutions supported by satisfied customers in multiple industries.
        </p>
        <div className="flex flex-row">
          <h2 className="mt-5 text-5xl font-bold">100K+</h2>
          <p className="mt-4 pt-6 px-3 mr-[700px] text-xl text-justify">
            Clients
          </p>
        </div>
        <button className="mt-6 px-6 py-3 text-lg font-semibold bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition">
          Explore Now →
        </button>

        {/* Circular Progress Indicator */}
        <div className="absolute flex flex-col items-center justify-center bottom-10 right-10 w-[150px] h-[120px] bg-white rounded-2xl drop-shadow-xl">
          <div className="w-16 h-16">
            <CircularProgressbar
              value={percentage}
              text={`${percentage}%`}
              styles={buildStyles({
                textColor: "#000",
                pathColor: "#ff6384",
                trailColor: "#ffe5eb",
                textSize: "30px",
              })}
            />
          </div>
          <p className="mt-2 text-sm font-semibold text-gray-700">
            New Visitors
          </p>
        </div>
      </div>
      Additional Content (Scrolls Normally)
      <div className="relative bg-white p-10">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
        recusandae porro amet ab harum consequuntur, quod dolorem! Sed, aliquid
        porro earum assumenda minus ipsa quod dolorem explicabo asperiores
        similique esse. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Cum eveniet in facere a eaque obcaecati corrupti vel quo quos laborum?
        Enim id sapiente repudiandae aspernatur ab modi cum odit. Eveniet.
      </div>
    </div>
  );
}
