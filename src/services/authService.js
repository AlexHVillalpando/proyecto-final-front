export const loginUser = async (credentials) => {
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      throw new Error("Error al iniciar sesión");
    }
    return response.json();
  };

  export const registerUser = async (userData) => {
    const response = await fetch("http://localhost:3000/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error("Error al registrar el usuario");
    }
    return response.json();
  };

  export const getUserData = async (token) => {

    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const userId = decodedToken.id;
  
    const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Error al obtener los datos del usuario");
    }
  
    return response.json();
  };

  export const createSecurityBox = async (token, newBoxData) => {
    console.log("Datos enviados al backend:", newBoxData);
  
    const response = await fetch("http://localhost:3000/api/security", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newBoxData),
    });
  
    console.log("Respuesta del backend:", response);
  
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error del backend:", errorData);
      throw new Error(errorData.error || "Error al crear la caja de seguridad");
    }
  
    return response.json();
  };