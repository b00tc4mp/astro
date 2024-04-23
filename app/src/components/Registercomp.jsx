import { useEffect, useState } from "react";

export default function Register () {
  const [data, setData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });
  const [token, setToken] = useState(null);
  const [registered, setRegistered] = useState(false); // Nuevo estado para controlar si el usuario ya está registrado
  
  const handleRegister = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const registerUser = async () => {
      try {
        if (data.nombre && data.apellido && data.email && data.password && !registered) {
          const response = await fetch('http://localhost:4000/sessions/register/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });

          if (response.ok) {
            const responseData = await response.json();
            const token = responseData.token;
            setToken(token);
            setRegistered(true); // Actualizar el estado para indicar que el usuario está registrado
            alert("Registro exitoso");
            window.location.href = 'http://localhost:4321/';
          } else {
            const errorMessage = await response.text();
            console.error(`Error de registro: ${errorMessage}`);
          }
        }
      } catch (error) {
        console.error(`Error de registro: ${error}`);
      }
    };

    // Llamar a la función de registro solo cuando los datos del formulario cambien
    registerUser();
  }, [data, registered]); // Se ejecutará cuando los datos del formulario cambien o cuando el estado de "registered" cambie
  
  return (
      <form method="POST" onSubmit={handleRegister} className="flex flex-col justify-center items-center gap-1">
        <label>
          Nombre:
          <input type="text" name="nombre" required value={data.nombre} onChange={(e)=> setData({...data, nombre: e.target.value,})}/> 
        </label>
        <label>
          Apellido:
          <input type="text" name="apellido" required value={data.apellido} onChange={(e)=> setData({...data, apellido: e.target.value})}/>
        </label>
        <label>
          Email:
          <input type="email" name="email" required value={data.email} onChange={(e)=> setData({...data, email: e.target.value})}/>
        </label>
        <label className="pb-8">
          Contraseña:
          <input type="password" name="password" required value={data.password} onChange={(e)=> setData({...data, password: e.target.value})} />
        </label>
        <button>Register</button>
      </form>
    
  );
}


// import { useState } from "react";

// if (Astro.request.method === "POST") {
//   try {
//     const data = await Astro.request.formData();
//     const nombre = data.get("nombre");
//     const apellido = data.get("apellido");
//     const email = data.get("email");
//     const password = data.get("password");

//   } catch (error) {
//     if (error instanceof Error) {
//       console.error(error.message);
//     }
//   }
// }

// export default function Register () {
//   const [data, setData] = useState({
//     nombre: "",
//     apellido: "",
//     email: "",
//     password: ""
//   });
  
//   const handleRegister = (e)=> {
//     e.preventDefault()
//   }

//   return (
//       <form method="POST" onSubmit={handleRegister} className="flex flex-col justify-center items-center gap-1">
//         <label>
//           Nombre:
//           <input type="text" name="nombre" required value={data.nombre} onChange={(e)=> setData({...data, nombre: e.target.value,})}/>
          
//         </label>
//         <label>
//           Apellido:
//           <input type="text" name="apellido" required value={data.apellido} onChange={(e)=> setData({...data, apellido: e.target.value})}/>
//         </label>
//         <label>
//           Email:
//           <input type="email" name="email" required value={data.email} onChange={(e)=> setData({...data, email: e.target.value})}/>
//         </label>
//         <label className="pb-8">
//           Contraseña:
//           <input type="password" name="password" required value={data.password} onChange={(e)=> setData({...data, password: e.target.value})} />
//         </label>
//         <button type="submit">Register</button>
//       </form>
//   );
// }




// export default function Form() {
//   const [responseMessage, setResponseMessage] = useState("");

//   async function submit(e) {
//     e.preventDefault();
//     const formData = new FormData(e.target)

//     try {
//       const response = await fetch('http://localhost:4000/sessions/register', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//     })

//     if (response.ok){
//       setResponseMessage("Registrer success")
//       window.location.href = 'http://localhost:4321'
//     } else {
//       const errorMessage = await response.text()
//       setResponseMessage(`Register error: `, errorMessage)
//       console.error('Register error: ', errorMessage)
//     }
      
//     } catch (error) {
//       setResponseMessage(`Register error: ${error}`)
//       console.error('Register error: ', error)
//     }
//   }



    // try {
    //     const response = fetch('http://localhost:4000/sessions/register', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ nombre: nombre, apellido: apellido, email: email, password: password}),
    //     });
  
    //     if (response.ok) {
    //         window.location.href('http://localhost:4321')
    //     } else {
    //         // Handle registration failure (username already exists, etc.)
    //         console.error('Registration failed!');
    //     }
    // } catch (error) {
    //     console.error('Error during registration:', error);
    // }