import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./Home.tsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ContactUs from "./ContactUs.tsx";
import LogIn from "./LogIn.tsx";
import AdminPanel from "./AdminPanel.tsx";
import AuthRoute from "./AuthRoute.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Product" element={<Navigate to="/" />} />
        <Route path="/Explore" element={<Navigate to="/" />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/AdminLogin" element={<LogIn />} />
        <Route element={<AuthRoute />}>
          <Route path="/AdminPanel" element={<AdminPanel />} />
        </Route>
      </Routes>
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </BrowserRouter>
  </StrictMode>
);
