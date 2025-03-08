import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home.tsx";
import ContactUs from "./ContactUs.tsx";
import LogIn from "./LogIn.tsx";
import AdminPanelUser from "./AdminPanelUser.tsx";
import AdminPanelQueries from "./AdminPanelQueries.tsx";
import AuthRoute from "./AuthRoute.tsx";
import AdminPanel from "./AdminPanel.tsx"; // Parent component for /AdminPanel
import Blogs from "./Blogs.tsx";
import BlogDetail from "./BlogDetails.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Product" element={<Navigate to="/" />} />
        <Route path="/Explore" element={<Navigate to="/" />} />
        <Route path="/Blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/AdminLogin" element={<LogIn />} />

        {/* Protect the admin panel route */}
        <Route element={<AuthRoute />}>
          <Route path="/AdminPanel" element={<AdminPanel />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
