import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "../styles/Register.css"

const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({
        name,
        surname,
        email,
        cellphone,
        password,
        code,
      });
      if (response.id) {
        navigate("/login");
      }
    } catch (err) {
      setError("Error al registrar el usuario");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Registro</h2>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <label>Nombre:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Apellido:</label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Teléfono:</label>
            <input
              type="text"
              value={cellphone}
              onChange={(e) => setCellphone(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Código:</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="register-button">Registrarse</button>
        </form>
        <div className="login-link">
          <p>¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
