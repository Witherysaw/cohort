import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "boxicons"; // Import BoxIcons
import Popup from "./Componants/Popup";
import AdminMenuBar from "./Componants/AdminPanelMenu";

export default function AdminPanelQueries() {
  return (
    <div className="flex h-screen">
      <div>
        {/* User Table */}
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Username</th>
              <th className="border p-2">Level</th>
              <th className="border p-2">Password</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="text-center p-4">
                No users found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
