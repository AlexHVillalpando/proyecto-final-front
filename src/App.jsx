import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SecurityBoxDetails from "./pages/SecurityBoxDetails";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/security-box/:boxId"
          element={
            <ProtectedRoute>
              <SecurityBoxDetails />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
