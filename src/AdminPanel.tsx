import { Outlet, Link } from "react-router-dom";
import AdminPanelUser from "./AdminPanelUser";
import AdminPanelQueries from "./AdminPanelQueries";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPanel({}) {
  const [activeTab, setActiveTab] = useState("queries");
  const menuheight = 5;
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: "",
    name: "",
    username: "",
    level: "",
  });

  // Fetch user by ID from backend using localStorage userId
  const fetchUserById = () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("No user ID found in localStorage");
      return;
    }

    fetch(`http://localhost:5000/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("User not found:", data.error);
        } else {
          setUser(data); // Assuming you want to set a single user
        }
      })
      .catch((error) => console.error("Error fetching user:", error));
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    navigate("/AdminLogin");
  };

  // Fetch user data when component mounts
  useEffect(() => {
    fetchUserById();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="flex w-screen h-screen">
      {/* Top Menu */}
      <div
        className="bg-white absolute top-0 flex items-center px-10 justify-between w-screen shadow-lg"
        style={{ height: `${menuheight}rem` }}
      >
        <img
          src="https://i.ibb.co/J20Tf76/AIsolutions-Logo.png"
          alt="Logo"
          className="w-52 h-13 hover:scale-105 transition-all"
        />
        <h1 className="text-2xl font-semibold">Admin Panel</h1>
        <div className="gap-6 flex">
          <div className="flex gap-2 flex-col">
            <span className="font-semibold">{user.name || "Guest"}</span>
            <span className="text-sm text-gray-600">
              {user.level || "Unknown"}
            </span>
          </div>
          <button
            className=" bg-transparent border border-black text-black px-4 py-2 rounded-md hover:bg-[#2ec0ff] hover:text-white transition-all hover:border-gray-100 ease-in-out"
            onClick={logout}
          >
            Log Out
          </button>
        </div>
      </div>

      <div
        className="flex w-full flex-row flex-grow"
        style={{ marginTop: `${menuheight}rem` }}
      >
        {/* Sidebar */}
        <div className="flex flex-col gap-4 w-40 bg-blue-300 text-black p-4 h-full">
          <button
            className="bg-white rounded-md px-4 py-2"
            onClick={() => setActiveTab("queries")}
          >
            Contact Queries
          </button>

          {/* Only show User Management if the user is an admin */}
          {(user.level === "admin" || user.level === "Admin") && (
            <button
              className="bg-white rounded-md px-4 py-2"
              onClick={() => setActiveTab("user")}
            >
              Users Management
            </button>
          )}

          <button className="bg-white rounded-md px-4 py-2">
            Blogs Management
          </button>
        </div>

        {/* Page Content */}
        <div className="flex relative w-full bg-transparent overflow-hidden">
          {activeTab === "user" && <AdminPanelUser />}
          {activeTab === "queries" && <AdminPanelQueries />}{" "}
          {/* Ensure activeTab is 'queries' */}
        </div>
      </div>
    </div>
  );
}
