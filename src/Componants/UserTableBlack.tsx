import React from "react";

const UserTableBlack = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto text-white bg-black">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">ID</th>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Username</th>
            <th className="px-4 py-2 border-b">Level</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample row */}
          <tr>
            <td className="px-4 py-2 border-b">1</td>
            <td className="px-4 py-2 border-b">John Doe</td>
            <td className="px-4 py-2 border-b">johndoe</td>
            <td className="px-4 py-2 border-b">Admin</td>
            <td className="px-4 py-2 border-b">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Edit
              </button>
            </td>
          </tr>
          {/* More rows can be added here */}
        </tbody>
      </table>
    </div>
  );
};

export default UserTableBlack;
