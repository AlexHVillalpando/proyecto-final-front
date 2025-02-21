import React, { useState } from "react";

const CreateSecurityBox = ({ onCreate }) => {
  const [newBoxName, setNewBoxName] = useState("");
  const [newBoxFavorite, setNewBoxFavorite] = useState(false);
  const [error, setError] = useState("");

  const handleCreateBox = async () => {
    if (!newBoxName) {
      setError("El nombre de la caja es requerido");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      // Decodificar el token para obtener el userId
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.id;

      const newBox = {
        name: newBoxName,
        favorite: newBoxFavorite,
        icon: "default-icon",
        userId,
      };

      console.log("Datos enviados al backend:", newBox);

      await onCreate(token, newBox);

      setNewBoxName("");
      setNewBoxFavorite(false);
      setError("");
    } catch (err) {
      console.error("Error en handleCreateBox:", err);
      setError(err.message || "Error al crear la caja de seguridad");
    }
  };

  return (
    <div className="create-security-box-form">
      <input
        type="text"
        placeholder="Nombre de la caja"
        value={newBoxName}
        onChange={(e) => setNewBoxName(e.target.value)}
        className="create-input"
      />
      <label>
        Favorito:
        <input
          type="checkbox"
          checked={newBoxFavorite}
          onChange={(e) => setNewBoxFavorite(e.target.checked)}
        />
      </label>
      <button onClick={handleCreateBox} className="create-button">
        Crear
      </button>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default CreateSecurityBox;
