/* eslint-disable no-console */
export const loginUser = async ({ 
    
}) => {
    if (Astro.request.method === "POST") {
        try {
          const data = await Astro.request.formData();
          const nombre = data.get("nombre");
          const apellido = data.get("apellido");
          const email = data.get("email");
          const password = data.get("password");
          
          const formData = {
                  nombre: nombre,
                  apellido: apellido,
                  email: email,
                  password: password
              };
      
              // Envía los datos del formulario al endpoint
              fetch('http://localhost:4000/sessions/register', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(formData)
              })
              .then(response => {
                  if (response.ok) {
                      
                      return Astro.redirect('http://localhost:4321')
                  } else {
                   
                      console.error('Error en el registro:', response.statusText);
          
                  } 
              })
              .catch(error => {
                  console.error('Error en el registro:', error);
              });
          
          } catch (error) {
              if (error instanceof Error) {
              console.error(error.message);
              }
          }
      
      }
  };

 