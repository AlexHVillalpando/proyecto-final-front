import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData, createSecurityBox } from "../services/authService";
import ReactSwitch from "react-switch";
import CreateSecurityBox from "../components/CreateSecurityBox";
import SecurityBoxList from "../components/SecurityBoxList";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [securityBoxes, setSecurityBoxes] = useState([]);
  const [filteredBoxes, setFilteredBoxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const userData = await getUserData(token);
        setSecurityBoxes(userData.security_boxes);
        setFilteredBoxes(userData.security_boxes);
      } catch (err) {
        setError("Error al cargar los datos del usuario");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    if (filterFavorites) {
      setFilteredBoxes(securityBoxes.filter((box) => box.favorite));
    } else {
      setFilteredBoxes(securityBoxes);
    }
  }, [filterFavorites, securityBoxes]);

  const handleCreateBox = async (token, newBox) => {
    try {
      const createdBox = await createSecurityBox(token, newBox);
      setSecurityBoxes([...securityBoxes, createdBox]);
    } catch (err) {
      console.error("Error en handleCreateBox:", err);
      setError(err.message || "Error al crear la caja de seguridad");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2 className="dashboard-title">Key Keeper</h2>

        <button onClick={() => setShowForm(!showForm)} className="dashboard-button">
          {showForm ? "Ocultar formulario" : "Crear nueva caja de seguridad"}
        </button>

        {showForm && <CreateSecurityBox onCreate={handleCreateBox} />}

        <div className="switch-container">
          <label>Mostrar solo favoritos:</label>
          <ReactSwitch
            checked={filterFavorites}
            onChange={() => setFilterFavorites(!filterFavorites)}
            offColor="#888"
            onColor="#4caf50"
            offHandleColor="#fff"
            onHandleColor="#fff"
          />
        </div>

        <div className="security-box-list">
          <SecurityBoxList securityBoxes={filteredBoxes} />
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="dashboard-button logout-button"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
