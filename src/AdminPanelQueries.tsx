import { useEffect, useState } from "react";
import InquiryTableWhite from "./Componants/InquiryTableWhite";
import InquiryTableBlack from "./Componants/InquiryTableBlack";

export default function AdminPanelQueries() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [countryFilter, setCountryFilter] = useState<string>(""); // Country filter state
  const [stateFilter, setStateFilter] = useState<string>(""); // State filter state
  const [solutionFilter, setSolutionFilter] = useState<string>(""); // Solution filter state
  const [nameFilter, setNameFilter] = useState<string>(""); // Name filter state
  const [dateFilter, setDateFilter] = useState<string>(""); // Date filter state
  const [countries, setCountries] = useState<string[]>([]); // List of countries
  const [user, setUser] = useState({ level: "" });

  const clearFilters = () => {
    setCountryFilter("");
    setStateFilter("");
    setSolutionFilter("");
    setNameFilter("");
    setDateFilter("");
    fetchInquiries(); // Reload the data without filters
  };

  // Fetch user details from backend
  const fetchUserById = () => {
    const userId = localStorage.getItem("userId"); // Assuming user ID is stored after login
    if (!userId) return;

    fetch(`http://localhost:5000/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user:", error));
  };

  // Function to format the date as 'YYYY-MM-DD'
  const formatDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${year}-${month}-${day}`; // Ensure it's in the correct format
  };

  // Fetch inquiries from the backend with filters
  const fetchInquiries = () => {
    setLoading(true);
    let url = "http://localhost:5000/inquiries?";
    if (countryFilter) url += `country=${countryFilter}&`;
    if (stateFilter) url += `state=${stateFilter}&`;
    if (nameFilter) url += `name=${nameFilter}&`;
    if (dateFilter) url += `date=${formatDate(dateFilter)}&`; // Format the date before passing it
    if (solutionFilter) url += `solution=${solutionFilter}&`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setInquiries(data))
      .catch((error) => console.error("Error fetching inquiries:", error))
      .finally(() => setLoading(false));
  };

  // Fetch country options from the backend
  const fetchCountries = () => {
    fetch("http://localhost:5000/inquiries/countries")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error));
  };

  // Call fetchInquiries when the component mounts
  useEffect(() => {
    fetchUserById();
    fetchInquiries();
    fetchCountries();
  }, [countryFilter, stateFilter, nameFilter, dateFilter, solutionFilter]); // Refetch when any filter changes

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

            {/* Filters */}
            <div className="flex gap-4 mb-4">
              <div className="flex items-center">
                <label className="mr-2">Country:</label>
                <select
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  className="px-4 py-1 border-2 rounded-md  border-blue-300 focus:bg-slate-100 focus:outline-sky-500"
                >
                  <option value="">All</option>
                  {countries.map((country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center">
                <label className="mr-2">State:</label>
                <select
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
                  className="px-4 py-1 border-2 rounded-md  border-blue-300 focus:bg-slate-100 focus:outline-sky-500"
                >
                  <option value="">All</option>
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              {/* <div className="flex items-center">
                <label className="mr-2">Solution:</label>
                <select
                  value={solutionFilter}
                  onChange={(e) => setSolutionFilter(e.target.value)}
                  className="px-4 py-1 border-2 rounded-md  border-blue-300 focus:bg-slate-100 focus:outline-sky-500"
                >
                  <option value="">Select Solution</option>
                  <option value="Solution 1">Solution 1</option>
                  <option value="Solution 2">Solution 2</option>
                  <option value="Solution 3">Solution 3</option>
                  <option value="Solution 4">Solution 4</option>
                  <option value="Solution 5">Solution 5</option>
                  <option value="Solution 6">Solution 6</option>
                  <option value="Solution 7">Solution 7</option>
                  <option value="Solution 8">Solution 8</option>
                  <option value="Solution 9">Solution 9</option>
                  <option value="Solution 10">Solution 10</option>
                </select>
              </div> */}

              <div className="flex items-center">
                <label className="mr-2">Name:</label>
                <input
                  type="text"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  placeholder="Search by Name"
                  className="w-[160px] px-4 py-1 border-2 rounded-md  border-blue-300 focus:bg-slate-100 focus:outline-sky-500"
                />
              </div>

              <div className="flex items-center">
                <label className="mr-2">Date:</label>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-4 py-1 border-2 rounded-md  border-blue-300 focus:bg-slate-100 focus:outline-sky-500"
                />
              </div>

              {/* Refresh Button */}
              <div className="flex p-2 gap-2">
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
          </div>

          <div className="relative overflow-x-auto">
            <InquiryTableWhite
              userLevel={user.level}
              inquiries={inquiries}
              loading={loading}
              refresh={refresh}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
