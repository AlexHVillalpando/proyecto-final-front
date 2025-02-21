import React from "react";
import { Link } from "react-router-dom";

const SecurityBoxList = ({ securityBoxes }) => {
  return (
    <div className="security-box-list">
      {securityBoxes.length > 0 ? (
        securityBoxes.map((box) => (
          <div key={box.id} className="security-box-card">
            <h3 className="card-text">{box.name}</h3>
            <p className="card-text">{box.favorite ? "Favorito" : "No favorito"}</p>
            <Link to={`/security-box/${box.id}`} className="security-box-link">
              Ver credenciales
            </Link>
          </div>
        ))
      ) : (
        <p>No tienes cajas de seguridad registradas.</p>
      )}
    </div>
  );
};

export default SecurityBoxList;
