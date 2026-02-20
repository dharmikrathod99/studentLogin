import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/" />}
      />
      <Route
        path="/students"
        element={token ? <Students /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
