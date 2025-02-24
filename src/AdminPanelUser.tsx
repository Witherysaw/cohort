import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "boxicons"; // Import BoxIcons
import Popup from "./Componants/Popup";

export default function AdminPanelUser() {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    level: "",
    password: "",
  });
  const [editUser, setEditUser] = useState({
    id: "",
    name: "",
    username: "",
    level: "",
    password: "",
  });
  const [deleteUser, setDeleteUser] = useState({
    id: "",
    name: "",
    username: "",
    level: "",
  });
  const [selectedUser, setSelectedUser] = useState<any>(null); // Stores fetched user data
  const [users, setUsers] = useState([]);
  const [userLevels, setUserLevels] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>(""); // Input field state
  const [appliedSearchQuery, setAppliedSearchQuery] = useState<string>(""); // Stores search only when button is clicked
  const [loading, setLoading] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleReset = () => {
    setNewUser({
      name: "",
      username: "",
      level: "",
      password: "",
    });
    setDeleteUser({
      id: "",
      name: "",
      username: "",
      level: "",
    });
    setEditUser({
      id: "",
      name: "",
      username: "",
      level: "",
      password: "",
    });
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Handle Add User
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        setIsAddUserOpen(false);
        fetchUsers(); // Refresh user list
      } else {
        console.error("Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Handle Update User
  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission from reloading

    try {
      const response = await fetch(
        `http://localhost:5000/users/${editUser.id}`,
        {
          method: "PUT", // Use PUT for updates
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editUser), // Send updated user data
        }
      );

      if (response.ok) {
        alert("User updated successfully!");
        setIsEditUserOpen(false); // Close popup after saving
        fetchUsers();
      } else {
        alert("Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Handle Delete User
  const handleDeleteUser = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission from reloading

    try {
      const response = await fetch(
        `http://localhost:5000/users/${deleteUser.id}`,
        {
          method: "DELETE", // Use DELETE for deletion
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("User Deleted successfully!");
        setIsDeleteUserOpen(false); // Close popup after saving
        setDeleteUser({
          id: "",
          name: "",
          username: "",
          level: "",
        }); // Reset state
        fetchUsers();
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Fetch users from backend
  const fetchUsers = () => {
    setLoading(true);
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        extractUserLevels(data);
      })
      .catch((error) => console.error("Error fetching users:", error))
      .finally(() => setLoading(false));
  };

  // Extract unique user levels
  const extractUserLevels = (data: any[]) => {
    const levels = Array.from(new Set(data.map((user) => user.level)));
    setUserLevels(levels);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!isDeleteUserOpen || !isEditUserOpen) {
      handleReset();
    }
  }, [isDeleteUserOpen, isEditUserOpen]);

  //fetch users with ID for edit and Delete
  const handleFetchUser = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission from closing the popup

    if (!editUser.id && !deleteUser.id) {
      alert("Please enter an ID.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/users/${editUser.id || deleteUser.id}`
      );
      if (response.ok) {
        const userData = await response.json();
        setEditUser(userData);
        setDeleteUser(userData); // Fill textboxes with user data
      } else {
        alert("User not found");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  //refresh
  const refresh = () => {
    fetchUsers(); // Refresh the user list
  };

  const clearFilters = () => {
    setSearchQuery(""); // Clears the input state
    setAppliedSearchQuery(""); // Clears the applied search
    setSelectedLevel("");
  };

  // Search only when button is clicked
  const applySearch = () => {
    setAppliedSearchQuery(searchQuery);
  };

  // Filter users based on search and level
  const filteredUsers = users.filter((user) => {
    const matchesLevel = selectedLevel ? user.level === selectedLevel : true;
    const matchesSearch =
      appliedSearchQuery === "" ||
      user.name.toLowerCase().includes(appliedSearchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(appliedSearchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="flex h-screen w-full">
      {/* Main Content */}
      <div className=" w-full flex-1 flex flex-col">
        {/* User Table */}
        <div className="p-6 overflow-x-auto">
          <div className="flex flex-row justify-between">
            <h2 className="text-xl font-semibold mb-4 flex">User Management</h2>

            {/* Search Box */}
            <div className="flex  bg-transparent">
              <input
                type="text"
                placeholder="Search for Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mx-5 h-[35px] w-40  pl-2 rounded-md border-2 border-blue-300 focus:bg-slate-100 focus:outline-sky-500"
              />
              <button
                className="bg-[#2ec0ff] h-[35px] px-5 pb-1 rounded-md text-white"
                onClick={applySearch} // Search applies only on button click
              >
                Search
              </button>
            </div>

            {/* Dropdown Filter */}
            <div className="bg-transparent">
              <select
                className="mx-5 h-[35px] w-40  pl-2 rounded-md border-2 border-blue-300 focus:bg-slate-100 focus:outline-sky-500"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                <option value="">All Users</option>
                {userLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex p-2 flex-row w-[450px] justify-evenly bg-transparent relative bottom-2">
              <button
                className="bg-[#2ec0ff] h-[35px] px-5 pb-1 rounded-md text-white"
                onClick={() => setIsAddUserOpen(true)}
              >
                Add User
              </button>
              <button
                className="bg-[#2ec0ff] h-[35px] px-5 pb-1 rounded-md text-white"
                onClick={() => setIsEditUserOpen(true)}
              >
                Edit User
              </button>
              <button
                className="bg-[#2ec0ff] h-[35px] px-3 pb-1 rounded-md text-white"
                onClick={() => setIsDeleteUserOpen(true)}
              >
                Delete User
              </button>

              {/* Refresh Button */}
              <button
                onClick={refresh}
                className="flex items-center gap-2 bg-blue-500 px-1 py-1 rounded-md text-white text-center hover:bg-blue-600 transition-all"
                disabled={loading}
              >
                <box-icon
                  name="refresh"
                  animation={loading ? "spin" : ""}
                ></box-icon>
              </button>
              {/* Clear Filters Button */}
              <button
                onClick={clearFilters}
                className="flex items-center gap-2 bg-gray-400 px-1 py-1 rounded-md text-white hover:bg-gray-500 transition-all"
                disabled={loading}
              >
                <box-icon name="x-circle"></box-icon>
              </button>
            </div>
          </div>

          {/* Add User Popup */}
          {isAddUserOpen && (
            <Popup title="Add New User" onClose={() => setIsAddUserOpen(false)}>
              <form className="flex flex-col" onSubmit={handleAddUser}>
                <label className="mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  className="border p-2 mb-4 focus:outline-sky-500"
                  placeholder="Enter Name"
                  value={newUser.name}
                  onChange={handleInputChange}
                />

                <label className="mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  className="border p-2 mb-4 focus:outline-sky-500"
                  placeholder="Enter Username"
                  value={newUser.username}
                  onChange={handleInputChange}
                />

                <label className="mb-2">Level</label>
                <input
                  type="text"
                  name="level"
                  className="border p-2 mb-4 focus:outline-sky-500"
                  placeholder="Enter Level"
                  value={newUser.level}
                  onChange={handleInputChange}
                />

                <label className="mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  className="border p-2 mb-4 focus:outline-sky-500"
                  placeholder="Enter Password"
                  value={newUser.password}
                  onChange={handleInputChange}
                />

                <div className="flex flex-row gap-5 justify">
                  <button
                    type="submit"
                    className="bg-[#1dafed] hover:bg-[#1d87b4] text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsAddUserOpen(false)}
                    className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Popup>
          )}

          {/* Edit User Popup */}
          {isEditUserOpen && (
            <Popup title="Edit User" onClose={() => setIsEditUserOpen(false)}>
              <form className="flex flex-col" onSubmit={handleUpdateUser}>
                {/* ID Input and Fetch Button */}
                <label className="mb-2">Enter User ID</label>
                <div className="flex flex-row justify-between">
                  <input
                    type="text"
                    name="id"
                    className="border p-2 mb-4 w-40 focus:outline-sky-500"
                    placeholder="Enter ID"
                    value={editUser.id}
                    onChange={(e) =>
                      setEditUser({ ...editUser, id: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-4 ml-2 rounded h-[45px]"
                    onClick={handleFetchUser} // Fetch user data
                  >
                    Fetch Data
                  </button>
                </div>

                {/* Other Inputs */}
                <label className="mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  className="border p-2 mb-4 focus:outline-sky-500"
                  placeholder="Enter Name"
                  value={editUser.name}
                  onChange={(e) =>
                    setEditUser({ ...editUser, name: e.target.value })
                  }
                />

                <label className="mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  className="border p-2 mb-4 focus:outline-sky-500"
                  placeholder="Enter Username"
                  value={editUser.username}
                  onChange={(e) =>
                    setEditUser({ ...editUser, username: e.target.value })
                  }
                />

                <label className="mb-2">Level</label>
                <input
                  type="text"
                  name="level"
                  className="border p-2 mb-4 focus:outline-sky-500"
                  placeholder="Enter Level"
                  value={editUser.level}
                  onChange={(e) =>
                    setEditUser({ ...editUser, level: e.target.value })
                  }
                />

                <label className="mb-2">Password</label>
                <input
                  type="text"
                  name="password"
                  className="border p-2 mb-4 focus:outline-sky-500"
                  placeholder="Enter Password"
                  value={editUser.password}
                  onChange={(e) =>
                    setEditUser({ ...editUser, password: e.target.value })
                  }
                />

                {/* Save & Cancel Buttons */}
                <div className="flex flex-row gap-5">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditUserOpen(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Popup>
          )}

          {/* Delete User Popup */}
          {isDeleteUserOpen && (
            <Popup title="Edit User" onClose={() => setIsDeleteUserOpen(false)}>
              <form className="flex flex-col" onSubmit={handleDeleteUser}>
                {/* ID Input and Fetch Button */}
                <label className="mb-2">Enter User ID</label>
                <div className="flex flex-row justify-between">
                  <input
                    type="text"
                    name="id"
                    className="border p-2 mb-4 w-40 focus:outline-sky-500"
                    placeholder="Enter ID"
                    value={deleteUser.id}
                    onChange={(e) =>
                      setDeleteUser({ ...deleteUser, id: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-4 h-[45px] ml-2 rounded"
                    onClick={handleFetchUser} // Fetch user data
                  >
                    Fetch Data
                  </button>
                </div>

                {/* Other Inputs */}
                <label className="mb-2">Name</label>
                <label className="border p-2 mb-4 w-40 focus:outline-sky-500">
                  {deleteUser.name}
                </label>

                <label className="mb-2">Username</label>
                <label className="border p-2 mb-4 w-40 focus:outline-sky-500">
                  {deleteUser.username}
                </label>

                {/* Delete & Cancel Buttons */}
                <div className="flex flex-row gap-5">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsDeleteUserOpen(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Popup>
          )}

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
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user: any) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="border p-2">{user.id}</td>
                    <td className="border p-2">{user.name}</td>
                    <td className="border p-2">{user.username}</td>
                    <td className="border p-2">{user.level}</td>
                    <td className="border p-2 relative w-40 text-center font-mono">
                      <PasswordReveal password={user.password} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center p-4">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Password Reveal Component with BoxIcons
function PasswordReveal({ password }: { password: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex items-center justify-center">
      {/* Display password as stars or the actual value */}
      <span className="mr-2">{visible ? password : "********"}</span>

      {/* BoxIcon: Show/Hide button */}
      <button
        onMouseDown={() => setVisible(true)}
        onMouseUp={() => setVisible(false)}
        onMouseLeave={() => setVisible(false)}
        className="focus:outline-none absolute right-[20px]"
      >
        <box-icon
          name={visible ? "hide" : "show"}
          className="text-xl cursor-pointer"
        ></box-icon>
      </button>
    </div>
  );
}
