import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserData } from "../services/authService";
import { Button, Modal, Box, TextField, Typography } from '@mui/material';

const SecurityBoxDetails = () => {
  const { boxId } = useParams();
  const [credentialStorage, setCredentialStorage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [newCredential, setNewCredential] = useState({
    account: "",
    password: "",
    description: "",
    code_1: "",
    code_2: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      try {
        const userData = await getUserData(token);
        const securityBox = userData.security_boxes.find((box) => box.id === boxId);
        if (securityBox) {
          setCredentialStorage(securityBox.credentialsStorage || []);
        }
      } catch (err) {
        setError("Error al cargar los datos de la caja de seguridad");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [boxId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCredential((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No tienes sesión iniciada.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/api/credential", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newCredential,
          securityId: boxId,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al crear la nueva credencial: ${errorText}`);
      }
  
      const newCredentialData = await response.json();
      setCredentialStorage([...credentialStorage, newCredentialData]);
      setModalOpen(false);
      setNewCredential({
        account: "",
        password: "",
        description: "",
        code_1: "",
        code_2: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };  

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h2>Detalles de la Caja de Seguridad</h2>
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => setModalOpen(true)} 
        sx={{ marginBottom: '20px' }}
      >
        Crear Nueva Credencial
      </Button>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Credenciales</th>
          </tr>
        </thead>
        <tbody>
        {credentialStorage.length > 0 ? (
            credentialStorage.map((cred, index) => (
            <tr key={index}>
                <td>{cred.account}</td>
            </tr>
            ))
        ) : (
            <tr>
            <td>No hay registros de credenciales.</td>
            </tr>
        )}
        </tbody>
      </table>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-create-credential"
        aria-describedby="modal-to-create-credential"
      >
        <Box sx={styles.modalBox}>
          <Typography variant="h6" sx={{ marginBottom: '20px' }}>Crear Nueva Credencial</Typography>
          <form onSubmit={handleSubmit}>
            <TextField 
              label="Cuenta"
              name="account"
              value={newCredential.account}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ marginBottom: '15px' }}
            />
            <TextField 
              label="Contraseña"
              name="password"
              type="password"
              value={newCredential.password}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ marginBottom: '15px' }}
            />
            <TextField 
              label="Descripción"
              name="description"
              value={newCredential.description}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ marginBottom: '15px' }}
            />
            <TextField 
              label="Código 1"
              name="code_1"
              value={newCredential.code_1}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ marginBottom: '15px' }}
            />
            <TextField 
              label="Código 2"
              name="code_2"
              value={newCredential.code_2}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ marginBottom: '15px' }}
            />
            <div style={styles.modalActions}>
              <Button type="submit" variant="contained" color="primary">Crear</Button>
              <Button 
                type="button" 
                variant="outlined" 
                color="secondary" 
                onClick={() => setModalOpen(false)} 
                sx={{ marginLeft: '10px' }}
              >
                Cerrar
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  modalBox: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '8px',
    width: '400px',
    margin: 'auto',
    marginTop: '10%',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
};

export default SecurityBoxDetails;
