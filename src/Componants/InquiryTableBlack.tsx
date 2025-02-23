import React from "react";

type InquiryTableProps = {
  inquiries: any[]; // Adjust the type to match the actual structure of an inquiry
  loading: boolean;
};

const InquiryTableBlack: React.FC<InquiryTableProps> = ({
  inquiries,
  loading,
}) => {
  return (
    <table className="w-full text-sm text-left bg-black text-white">
      {/* Table headers and rows */}
      <thead className="text-xs text-gray-700 uppercase bg-white">
        <tr>
          <th scope="col" className="px-6 py-3">
            ID
          </th>
          <th scope="col" className="px-6 py-3">
            Full Name
          </th>
          <th scope="col" className="px-6 py-3">
            Email
          </th>
          <th scope="col" className="px-6 py-3">
            Phone
          </th>
          <th scope="col" className="px-6 py-3">
            Company
          </th>
          <th scope="col" className="px-6 py-3">
            Country
          </th>
          <th scope="col" className="px-6 py-3">
            Job Title
          </th>
          <th scope="col" className="px-6 py-3">
            Job Detail
          </th>
          <th scope="col" className="px-6 py-3">
            State
          </th>
          <th scope="col" className="px-6 py-3">
            Created At
          </th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={10} className="text-center py-2">
              Loading...
            </td>
          </tr>
        ) : inquiries.length > 0 ? (
          inquiries.map((inquiry) => (
            <tr key={inquiry.qid}>
              <td className="px-6 py-4">{inquiry.qid}</td>
              <td className="px-6 py-4">{inquiry.full_name}</td>
              <td className="px-6 py-4">{inquiry.email}</td>
              <td className="px-6 py-4">{inquiry.phone}</td>
              <td className="px-6 py-4">{inquiry.company}</td>
              <td className="px-6 py-4">{inquiry.country}</td>
              <td className="px-6 py-4">{inquiry.job_title}</td>
              <td className="px-6 py-4">{inquiry.job_detail}</td>
              <td className="px-6 py-4">{inquiry.state}</td>
              <td className="px-6 py-4">
                {new Date(inquiry.created_at).toLocaleString()}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={10} className="text-center py-2">
              No inquiries found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default InquiryTableBlack;
