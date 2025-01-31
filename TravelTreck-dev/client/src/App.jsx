import Home from "./Compornents/Home/Home";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./Compornents/Admin/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
