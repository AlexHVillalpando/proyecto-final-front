import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { loginUser } from "../services/authService"; 
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      if (response.token) {
        localStorage.setItem("token", response.token); 
        setIsLoggedIn(true);
        setTimeout(() => navigate("/dashboard"), 1500);
      }
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className={`lock-icon ${isLoggedIn ? "unlock" : ""}`}>
            <i className={`fa ${isLoggedIn ? "fa-lock-open" : "fa-lock"}`}></i>
          </div>
          <h2>Iniciar Sesión</h2>
        </div>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="input-container">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-btn">Iniciar Sesión</button>
        </form>
        <div className="register-link">
          <p>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
