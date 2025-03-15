import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPanelBlogs({
  setActiveTab,
  handleEditClick,
}: {
  setActiveTab: (tab: string) => void;
  handleEditClick: (blogId: string) => void;
}) {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId");
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

  useEffect(() => {
    fetchBlogs();
    fetchUserById();
  }, []);

  const fetchBlogs = () => {
    setLoading(true);
    let url = "http://localhost:5000/blogs";

    fetch(url)
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Error fetching inquiries:", error))
      .finally(() => setLoading(false));
  };

  const deleteBlog = async (blogId: number) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/blogs/${blogId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }

      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
      alert("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog. Please try again.");
    }
  };

  //   const fetchBlogs = async () => {
  //     try {
  //       // Use fetch API to get the blog data from the backend
  //       setLoading(true);
  //       const response = await fetch("http://127.0.0.1:5000/blogs");
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       setBlogs(data);
  //       setLoading(false); // Update the state with the fetched blogs
  //     } catch (error) {
  //       console.error("Error fetching blogs:", error);
  //     }
  //   };

  const refresh = () => {
    fetchBlogs();
  };

  return (
    <div className="flex h-full w-full">
      <div className="w-full flex-1 flex flex-col">
        <div className="flex flex-row justify-between bg-gray-100 py-3 px-6 drop-shadow-md">
          <h2 className="text-xl font-semibold mb-4 flex">Blog Management</h2>
          <div className="flex gap-4 mb-4">
            <div className="flex flex-row gap-2">
              <button
                className="rounded-md bg-sky-400 hover:bg-blue-600 px-3 py-2 pt-1 text-center justify-items-center text-white"
                onClick={() => setActiveTab("createBlog")}
              >
                Create Blog
              </button>
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
            </div>
          </div>
        </div>
        <div className="py-6 px-6 overflow-x-auto">
          {/* Display the blogs in cards */}
          <div className="gap-6 w-full">
            {blogs.map((blog: any) => (
              <div
                key={blog.id}
                className="border-collapse border-2 border-gray-300 pr-10 justify-between h-[200px] flex flex-row w-[100%] rounded overflow-hidden shadow-lg"
              >
                <div className="w-80 h-[180px] px-6 py-4 overflow-hidden">
                  <img
                    className=""
                    src={`http://127.0.0.1:5000/${blog.image1.replace(
                      "\\",
                      "/"
                    )}`} // Display the image
                    alt="Blog Image"
                  />
                </div>
                <div className="ml-[-120px] flex flex-col px-6 py-4">
                  <div className="font-bold text-2xl mb-2">{blog.title}</div>
                  <div className="h-[100px] w-80 ">
                    <p className="text-gray-700 text-base">
                      {blog.paragraph1.slice(0, 200)}...
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-row gap-3">
                      {/* "Go to blog" button - Visible to everyone */}
                      <button
                        className="bg-blue-500 px-4 py-1 rounded-md text-white hover:bg-blue-600"
                        onClick={() => navigate(`/blog/${blog.id}`)}
                      >
                        Go to blog
                      </button>

                      {/* "Edit" button - Only visible if user is the writer of the blog */}
                      {user.id === blog.user_id && (
                        <button
                          className="bg-yellow-500 px-4 py-1 rounded-md text-white hover:bg-yellow-600"
                          onClick={() => handleEditClick(blog.id)}
                        >
                          Edit
                        </button>
                      )}

                      {/* "Delete" button - Only visible if user is an admin */}
                      {user.level.toLowerCase() === "admin" && (
                        <button
                          className="bg-red-500 px-4 py-1 rounded-md text-white mr-2 hover:bg-red-600"
                          onClick={() => deleteBlog(blog.id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-items-center">
                  <div className="bg-slate-300 h-[150px] w-[8px] rounded-md"></div>
                </div>
                <div className="flex flex-col py-6 gap-8 w-80">
                  <p className="text-gray-700 text-xl">
                    <strong>Blog ID: </strong>
                    {blog.id}
                  </p>
                  <p className="text-gray-700 text-xl">
                    <strong>Date: </strong>
                    {new Date(blog.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 text-xl">
                    <strong>Writer: </strong>
                    {blog.writer_name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
