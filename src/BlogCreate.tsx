import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateBlog({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void;
}) {
  const [title, setTitle] = useState("");
  const [paragraph1, setParagraph1] = useState("");
  const [paragraph2, setParagraph2] = useState("");
  const [paragraph3, setParagraph3] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [blogId, setBlogId] = useState<number>(0);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  // Get the latest blog ID from the backend
  useEffect(() => {
    fetch("http://localhost:5000/latest-blog-id")
      .then((response) => response.json())
      .then((data) => {
        if (data.latest_blog_id) {
          setBlogId(data.latest_blog_id);
        }
      })
      .catch((error) => console.error("Error fetching blog ID:", error));
  }, []);

  // Get current date
  const currentDate = new Date().toLocaleDateString();

  // Handle Image Selection
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      if (filesArray.length + selectedImages.length > 3) {
        alert("You can only select up to 3 images.");
        return;
      }
      setSelectedImages((prevImages) => [...prevImages, ...filesArray]);
    }
  };

  // Handle Image Removal
  const removeImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Handle Upload Function
  const handleUpload = () => {
    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }
    if (!paragraph1.trim() || !paragraph2.trim() || !paragraph3.trim()) {
      alert("Please enter all three paragraphs.");
      return;
    }
    if (selectedImages.length !== 3) {
      alert("Please select exactly 3 images.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("paragraph1", paragraph1);
    formData.append("paragraph2", paragraph2);
    formData.append("paragraph3", paragraph3);
    formData.append("user_id", userId); // Replace with actual user ID
    selectedImages.forEach((image) => {
      formData.append("images", image);
    });

    fetch("http://localhost:5000/blogs", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Blog uploaded successfully!");
        setTitle("");
        setParagraph1("");
        setParagraph2("");
        setParagraph3("");
        setSelectedImages([]);
        setActiveTab("blog"); // Redirect to blogs page after upload
      })
      .catch((error) => console.error("Error uploading blog:", error));
  };

  return (
    <div className="w-full p-5 border rounded-lg shadow-md bg-white">
      {/* Blog ID and Date */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col gap-4">
          <p className="text-lg font-semibold">Blog ID: {blogId}</p>
          <p className="text-lg">Date: {currentDate}</p>
        </div>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            onClick={() => setActiveTab("blog")}
          >
            Back to Blogs
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </div>

      {/* Title Input */}
      <input
        type="text"
        className="w-full p-2 border rounded-lg mb-4"
        placeholder="Enter Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Image Upload Section */}
      <div className="flex gap-4 mb-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="relative w-32 h-32 border rounded-lg flex items-center justify-center bg-gray-100"
          >
            {selectedImages[index] ? (
              <div className="relative">
                <img
                  src={URL.createObjectURL(selectedImages[index])}
                  alt={`Selected ${index + 1}`}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded"
                >
                  X
                </button>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center">
                <span className="text-gray-500 text-sm">Add Image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
        ))}
      </div>

      {/* Paragraph Inputs */}
      <textarea
        className="w-full h-20 p-2 border rounded-lg mb-2"
        placeholder="Paragraph 1"
        value={paragraph1}
        onChange={(e) => setParagraph1(e.target.value)}
      ></textarea>

      <textarea
        className="w-full h-20 p-2 border rounded-lg mb-2"
        placeholder="Paragraph 2"
        value={paragraph2}
        onChange={(e) => setParagraph2(e.target.value)}
      ></textarea>

      <textarea
        className="w-full h-20 p-2 border rounded-lg"
        placeholder="Paragraph 3"
        value={paragraph3}
        onChange={(e) => setParagraph3(e.target.value)}
      ></textarea>
    </div>
  );
}
