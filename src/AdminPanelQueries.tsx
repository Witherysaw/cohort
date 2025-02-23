import { useEffect, useState } from "react";
import InquiryTableBlack from "./Componants/InquiryTableBlack";
import InquiryTableWhite from "./Componants/InquiryTableWhite";

export default function AdminPanelQueries() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch inquiries from the backend
  const fetchInquiries = () => {
    setLoading(true);
    fetch("http://localhost:5000/inquiries")
      .then((response) => response.json())
      .then((data) => setInquiries(data))
      .catch((error) => console.error("Error fetching inquiries:", error))
      .finally(() => setLoading(false));
  };

  // Call fetchInquiries when the component mounts
  useEffect(() => {
    fetchInquiries();
  }, []);

  // Refresh the inquiry list
  const refresh = () => {
    fetchInquiries();
  };

  return (
    <div className="flex h-screen w-full">
      {/* Main Content */}
      <div className="w-full flex-1 flex flex-col">
        <div className="p-6 overflow-x-auto">
          <div className="flex flex-row justify-between">
            <h2 className="text-xl font-semibold mb-4 flex">
              Inquiry Management
            </h2>

            {/* Refresh Button */}
            <div className="flex p-2">
              <button
                className="bg-[#2ec0ff] h-[35px] px-5 pb-1 rounded-md text-white"
                onClick={refresh}
              >
                Refresh
              </button>
            </div>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg border-2 border-black">
            <InquiryTableBlack inquiries={inquiries} loading={loading} />
            {/* <InquiryTableWhite inquiries={inquiries} loading={loading} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
