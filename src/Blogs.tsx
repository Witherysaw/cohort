import { useEffect, useState } from "react";
import Navbar from "./Componants/Navbar";
import CustomFooter from "./Componants/CustomFooter";
import { useNavigate } from "react-router-dom";

export default function Blogs() {
  // State to store the fetched blogs
  const [blogs, setBlogs] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const blogsPerPage = 4; // Number of blogs per page

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    let url = "http://localhost:5000/blogs";

    fetch(url)
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Error fetching blogs:", error));
  };

  // Calculate the indexes for slicing blogs
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Calculate total pages
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="h-full w-full bg-blue-50">
      <Navbar />
      <div className="mt-[10px] mx-auto w-[80%] py-6 bg-gray-50 justify-center items-center border-2 border-gray-300 rounded-lg">
        <div className="justify-items-center pb-8">
          <h1 className="text-2xl font-semibold">Blogs and Articles</h1>
          <p className="text-md py-2">
            Featuring the events and our latest innovations
          </p>
        </div>

        {/* Display the blogs in cards */}
        <div className="grid xl:grid-cols-2 grid-cols-1 gap-10 bg-transparent justify-items-center">
          {currentBlogs.map((blog: any) => (
            <div
              key={blog.id}
              className="w-[500px] h-[430px] rounded overflow-hidden shadow-lg border-2 border-gray-300"
            >
              <div className="w-full h-60 p-2">
                <img
                  className="w-full h-full object-cover"
                  src={`http://127.0.0.1:5000/${blog.image1.replace(
                    "\\",
                    "/"
                  )}`}
                  alt="Blog Image"
                />
              </div>
              <div className="flex flex-row px-6 py-1 gap-12">
                <div className="flex flex-row">
                  <strong>
                    <i className="bx bx-calendar text-gray-600 text-xl pr-1"></i>
                  </strong>
                  <p className="text-gray-600 text-base pb-1">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-row ">
                  <strong>
                    <i className="bx bx-user text-gray-600 text-xl pr-1"></i>
                  </strong>
                  <p className="text-gray-600 text-base pb-1">
                    {blog.writer_name}
                  </p>
                </div>
              </div>
              <div className="px-6 py-1">
                <div className="font-bold text-xl mb-2">{blog.title}</div>
                <p className="text-gray-700 text-base mb-10">
                  {blog.paragraph1.slice(0, 200)}...
                </p>
              </div>
              <button
                className="text-lg px-6 py-1 text-blue-400 hover:text-blue-600"
                onClick={() => navigate(`/blog/${blog.id}`)}
              >
                Read More →
              </button>
            </div>
          ))}
        </div>

        {/* Numbered Pagination Controls */}
        <div className="flex justify-center mt-6 space-x-2">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => {
                setCurrentPage(number);
                fetchBlogs(); // Fetch blogs again when page is clicked
              }}
              className={`px-4 py-2 font-semibold rounded ${
                currentPage === number
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
      <CustomFooter />
    </div>
  );
}
