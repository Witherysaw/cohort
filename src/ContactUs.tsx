import { useState, useEffect } from "react";
import Navbar from "./Componants/Navbar";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    country: "",
    jobTitle: "",
    jobDetail: "",
    state: "new",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [countries, setCountries] = useState<string[]>([]);

  // Fetch the list of countries from an API (like restcountries.com)
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const sortedCountries = data
          .map((country: { name: { common: string } }) => country.name.common)
          .sort(); // Sort countries alphabetically
        setCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!formData.name || !formData.email || !formData.jobDetail) {
      setMessage("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setShowPopup(true); // Show success popup
        setFormData({
          name: "",
          phone: "",
          email: "",
          company: "",
          country: "",
          jobTitle: "",
          jobDetail: "",
          state: "new",
        });
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute w-full min-h-screen bg-blue-50 flex flex-col items-center">
      <Navbar />

      {/* Background Image */}
      <div className="absolute top-10 left-0 w-[950px] h-[700px] overflow-hidden shadow-xl">
        <img
          className="opacity-85 w-[950px] h-[950px] flex z-1"
          src="https://i.ibb.co/5gd8k250/contactuspagebg.png"
          alt="contactuspagebg"
        />
      </div>

      {/* Contact Form */}
      <div className="absolute top-[105px] right-20 w-[600px] h-auto rounded-2xl shadow-2xl bg-white p-8">
        <h1 className="text-3xl font-semibold mb-6">Contact Form</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="font-medium">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="py-2 px-4 bg-transparent border-2 rounded-md border-gray-400 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="py-2 px-4 bg-transparent border-2 rounded-md border-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="py-2 px-4 bg-transparent border-2 rounded-md border-gray-400 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="py-2 px-4 bg-transparent border-2 rounded-md border-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="py-2 px-4 bg-transparent border-2 rounded-md border-gray-400 focus:outline-none focus:border-blue-500"
                required
              >
                <option value="">Select Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="font-medium">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="py-2 px-4 bg-transparent border-2 rounded-md border-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Job Details - Multiline Input */}
          <div className="flex flex-col">
            <label className="font-medium">Job Details *</label>
            <textarea
              name="jobDetail"
              value={formData.jobDetail}
              onChange={handleChange}
              className="w-full h-32 p-4 bg-transparent border-2 rounded-md border-gray-400 focus:outline-none focus:border-blue-500 resize-none overflow-y-auto"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white text-lg font-semibold bg-sky-400 rounded-lg shadow-md hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Inquiry"}
          </button>
        </form>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <h2 className="text-xl font-semibold mb-3">Inquiry Submitted</h2>
            <p className="text-gray-700">
              A confirmation email has been sent. If you don't receive it within
              an hour, please submit again.
            </p>
            <button
              className="mt-4 px-6 py-2 bg-sky-400 text-white rounded-lg hover:bg-blue-600"
              onClick={() => setShowPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
