import { useEffect, useState } from "react";

interface BlogData {
  title: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  image1: string;
  image2: string;
  image3: string;
}

export default function BlogEdit({
  blogId,
  setActiveTab,
}: {
  blogId: string;
  setActiveTab: (tab: string) => void;
}) {
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<(File | null)[]>([null, null, null]);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/blogs/${blogId}`)
      .then((response) => response.json())
      .then((data) => setBlogData(data))
      .catch((error) => console.error("Error fetching blog data:", error))
      .finally(() => setLoading(false));
  }, [blogId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!blogData) return;
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.target.files) {
      const newImages = [...images];
      newImages[index] = e.target.files[0]; // Update the corresponding image in the array
      setImages(newImages);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!blogData) return;

    const formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("paragraph1", blogData.paragraph1);
    formData.append("paragraph2", blogData.paragraph2);
    formData.append("paragraph3", blogData.paragraph3);

    // Append images (either files or URLs)
    [1, 2, 3].forEach((i) => {
      const image = images[i - 1]; // Get the image from the `images` state array based on index
      if (image) {
        // If image is a file, append it with the specific image field name
        formData.append(`image${i}`, image);
      } else {
        // If no new image is selected, use the existing image URL from `blogData`
        const currentImage = blogData[`image${i}` as keyof BlogData];
        if (currentImage) {
          formData.append(`image${i}`, currentImage);
        }
      }
    });

    try {
      const response = await fetch(`http://localhost:5000/blogs/${blogId}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to update blog");

      alert("Blog updated successfully!");
      setActiveTab("blog");
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!blogData) return <div>Blog not found</div>;

  return (
    <form onSubmit={handleSubmit} className="w-full overflow-x-auto">
      <div className="absolute top-0 h-[10%] w-full flex flex-row justify-between bg-white items-center px-12 drop-shadow-md">
        <h2 className="text-xl font-semibold mb-4 pt-3">Edit Blog</h2>

        {/* Buttons inside form so submission works */}
        <div className="flex justify-between gap-6">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("blog")}
            className="bg-gray-400 text-white py-2 px-4 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Other form fields */}
      <div className="w-full min-h-[10%]"></div>
      <div className="flex flex-col w-full">
        <div className="w-[100%] flex flex-col px-12 py-4 gap-2">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="block font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={blogData.title}
              onChange={handleInputChange}
              className="border-2 p-2 rounded-md w-full"
              required
            />
          </div>

          {/* Paragraphs */}
          {[1, 2, 3].map((i) => (
            <div className="flex flex-col gap-2" key={i}>
              <label className="block font-semibold">{`Paragraph ${i}`}</label>
              <textarea
                name={`paragraph${i}`}
                value={blogData[`paragraph${i}` as keyof BlogData]}
                onChange={handleInputChange}
                className="border-2 p-2 rounded-md w-full h-24"
                required
              />
            </div>
          ))}
        </div>

        {/* Images */}
        <div className="flex flex-row justify-evenly gap-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="mb-4 gap-2 flex flex-col">
              <label className="block font-semibold">{`Image ${i}`}</label>
              <input
                type="file"
                onChange={(e) => handleImageChange(e, i - 1)} // Adjust index for 0-based index
                className="border-2 p-2 rounded-md w-full"
              />
              {/* Show the updated image if it exists in the 'images' state */}
              {images[i - 1] ? (
                <img
                  src={URL.createObjectURL(images[i - 1]!)} // Create a preview URL for the selected image
                  alt={`Image ${i}`}
                  className="w-40 h-40 object-cover mt-2 rounded-md"
                />
              ) : (
                blogData[`image${i}` as keyof BlogData] && (
                  <img
                    src={blogData[`image${i}` as keyof BlogData]}
                    alt={`Image ${i}`}
                    className="w-40 h-40 object-cover mt-2 rounded-md"
                  />
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
