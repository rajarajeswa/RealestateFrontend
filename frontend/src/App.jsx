import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Home from "./pages/HomeFolder/home";
import AdminPortal from "./pages/admin/Admin";
import AdminOptions from "./pages/admin/AdminOptions";
import ViewProperty from "./pages/admin/ViewProperty";
import Users from "./pages/admin/ViewUser";
import Buy from "./pages/BuySellRent/BuySell";
import Inquiries from "./pages/admin/Inquiries";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/admin-options" element={<AdminOptions />} />
        <Route path="/view" element={<ViewProperty/>} />
        <Route path="/users" element={<Users/>} />
        <Route path="/buy" element={<Buy/>} />
        <Route path="/inquiries" element={<Inquiries/>} />








      </Routes>
    </BrowserRouter>
  );
}

export default App;
