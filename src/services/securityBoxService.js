export const getSecurityBoxes = async (token) => {
    const response = await fetch("http://localhost:3000/api/security-box", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Error al obtener las security boxes");
    }
  
    return response.json();
  };
  