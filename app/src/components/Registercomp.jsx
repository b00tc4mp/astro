import React, { useState, useEffect } from "react";

export default function Register() {
  const [data, setData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });
  const [token, setToken] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (data.nombre && data.apellido && data.email && data.password) {
        const response = await fetch("http://localhost:4000/sessions/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const responseData = await response.json();
          const token = responseData.token;
          setToken(token);
          alert("Registro exitoso");
          window.location.href = "http://localhost:4321/";
        } else {
          const errorMessage = await response.text();
          console.error(`Error de registro: ${errorMessage}`);
        }
      }
    } catch (error) {
      console.error(`Error de registro: ${error}`);
    }
  };


  return (
    <form method="POST" onSubmit={handleRegister} className="flex flex-col justify-center items-center gap-1">
      <label>
        Nombre:
        <input type="text" name="nombre" required value={data.nombre} onChange={(e) => setData({ ...data, nombre: e.target.value, })} />
      </label>
      <label>
        Apellido:
        <input type="text" name="apellido" required value={data.apellido} onChange={(e) => setData({ ...data, apellido: e.target.value })} />
      </label>
      <label>
        Email:
        <input type="email" name="email" required value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
      </label>
      <label className="pb-8">
        Contraseña:
        <input type="password" name="password" required value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
      </label>
      <button>Register</button>
    </form>

  );
}
