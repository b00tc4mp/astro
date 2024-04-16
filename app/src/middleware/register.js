/* eslint-disable no-console */
export async function onRequest({ locals, request }, next) {
    if (request.method === "POST") {
        try {
            const data = await request.formData();
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
            const response = await fetch('http://localhost:4000/sessions/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log("Usuario registrado");
            } else {
                console.error('Error en el registro:', response.statusText);
                // Devuelve una respuesta de redirección
                return new Response("Error en el registro", { status: 500 });
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            // Devuelve una respuesta de error
            return new Response("Error en el registro", { status: 500 });
        }
    }

    // Devuelve `next()` para permitir que la solicitud continúe su flujo normal
    return next();
}
