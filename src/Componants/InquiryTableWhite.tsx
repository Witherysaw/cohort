import { useState } from "react";
import Popup from "./PopUp";

const InquiryTableWhite = ({
  userLevel,
  inquiries,
  loading,
  refresh,
}: {
  userLevel: string;
  inquiries: any[];
  loading: boolean;
  refresh: () => void;
}) => {
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);

  // Handle updating the state
  const handleStateChange = async (id: number, newState: string) => {
    try {
      const response = await fetch(`http://localhost:5000/inquiries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ state: newState }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Inquiry state updated successfully");
        refresh();
      } else {
        alert("Failed to update inquiry state: " + result.error);
      }
    } catch (error) {
      console.error("Error updating inquiry state:", error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this inquiry?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/inquiries/${id}`, {
          method: "DELETE",
        });

        const result = await response.json();
        if (response.ok) {
          alert("Inquiry deleted successfully");
          refresh();
        } else {
          alert("Failed to delete inquiry: " + result.error);
        }
      } catch (error) {
        console.error("Error deleting inquiry:", error);
      }
    }
  };

  const handleDetails = (inquiry: any) => {
    setSelectedInquiry(inquiry);
  };

  return (
    <>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-200 text-black">
          <tr>
            <th className="py-2 px-4 border-b">Full Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Company</th>
            <th className="py-2 px-4 border-b">Country</th>
            <th className="py-2 px-4 border-b">State</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            inquiries.length > 0 ? (
              inquiries.map((inquiry) => (
                <tr key={inquiry.qid} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{inquiry.full_name}</td>
                  <td className="py-2 px-4 border-b">{inquiry.email}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(inquiry.created_at).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">{inquiry.company}</td>
                  <td className="py-2 px-4 border-b">{inquiry.country}</td>
                  <td className="py-2 px-4 border-b">
                    <select
                      value={inquiry.state}
                      onChange={(e) =>
                        handleStateChange(inquiry.qid, e.target.value)
                      }
                      className="bg-gray-200 text-black px-3 py-1 rounded-md"
                    >
                      <option value="New">New</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {/* Show Delete button only if the user is an admin */}
                    {userLevel.toLowerCase() === "admin" && (
                      <button
                        onClick={() => handleDelete(inquiry.qid)}
                        className="bg-red-500 px-4 py-1 rounded-md text-white mr-2 hover:bg-red-600"
                      >
                        Delete
                      </button>
                    )}
                    <button
                      onClick={() => handleDetails(inquiry)}
                      className="bg-blue-500 px-4 py-1 rounded-md text-white hover:bg-blue-600"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-2 px-4 text-center text-black">
                  No inquiries found
                </td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan={7} className="py-2 px-4 text-center">
                Loading...
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Show popup if an inquiry is selected */}
      {selectedInquiry && (
        <Popup title="Inquiry Details" onClose={() => setSelectedInquiry(null)}>
          <div className="text-gray-700">
            <p>
              <strong>Full Name:</strong> {selectedInquiry.full_name}
            </p>
            <p>
              <strong>Email:</strong> {selectedInquiry.email}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedInquiry.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Company:</strong> {selectedInquiry.company}
            </p>
            <p>
              <strong>Country:</strong> {selectedInquiry.country}
            </p>
            <p>
              <strong>State:</strong> {selectedInquiry.state}
            </p>
            <p>
              <strong>Job Title:</strong> {selectedInquiry.job_title}
            </p>
            <p>
              <strong>Job Details:</strong> {selectedInquiry.job_detail}
            </p>
          </div>
        </Popup>
      )}
    </>
  );
};

export default InquiryTableWhite;
