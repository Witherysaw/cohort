import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

interface Blog {
  id: number;
  title: string;
  writer_name: string;
  date: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  image1: string;
  image2: string;
  image3: string;
}

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>(); // Get blog ID from URL
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/blogs/${id}`) // Get blog by ID
      .then((response) => response.json())
      .then((data) => setBlog(data))
      .catch((error) => console.error("Error fetching blog:", error));
  }, [id]);

  if (!blog) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <Link to="/blogs" className="text-blue-600 mb-4 inline-block">
        ← Back to Blogs
      </Link>

      <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>

      <div className="flex items-center text-gray-500 text-sm mb-4">
        <span>{blog.date}</span>
        <span className="mx-2">•</span>
        <span className="font-medium">{blog.writer_name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <img src={blog.image1} alt="Blog" className="w-full rounded-md" />
        <img src={blog.image2} alt="Blog" className="w-full rounded-md" />
        <img src={blog.image3} alt="Blog" className="w-full rounded-md" />
      </div>

      <p className="mt-6 text-lg text-gray-700">{blog.paragraph1}</p>
      <p className="mt-4 text-lg text-gray-700">{blog.paragraph2}</p>
      <p className="mt-4 text-lg text-gray-700">{blog.paragraph3}</p>
    </div>
  );
}
