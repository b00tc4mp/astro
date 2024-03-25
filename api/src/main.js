import express from 'express'
import fs from 'fs/promises'
import cors from 'cors'

const app = express()
const port = 4000
const PATH = './src/user.json'

class User {
    constructor(nombre, apellido, email, password){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.id = User.incrementarID();
    }

    static incrementarID() {
        if (User.idIncrement) {
            User.idIncrement++;
        } else {
            User.idIncrement = 1;
        }
        return User.idIncrement;
    }
}

app.use(express.urlencoded({ extended:true }))
app.use(express.json());

app.get("/", (req,res)=> {
    res.status(400).send("pagina principal")
})

app.post('/users', async (req, res) => {
    const { nombre, apellido, email, password } = req.body;

    try {
        let users = [];
        try {
            // Intentar leer el archivo JSON
            const data = await fs.readFile(PATH, 'utf-8');
            users = JSON.parse(data);
        } catch (error) {
            // Manejar el caso en el que el archivo JSON esté vacío o no exista
            console.error("Error al leer el archivo JSON:", error);
        }

        const user = users.find(usuario => usuario.email === email);

        if (user) {
            res.send("Usuario ya existente");
        } else {
            const userClass = new User (nombre, apellido, email, password)
    
            users.push(userClass);
            await fs.writeFile(PATH, JSON.stringify(users));
            res.status(200).send(`Usuario ${nombre} creado`);
        }
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.status(500).send("Error interno del servidor");
    }
});

app.put('/users/:id', async (req, res)=> {

    const { id } = req.params
    const { nombre, apellido, email, password } = req.body;

    try {
        let users = [];
        try {
            const data = await fs.readFile(PATH, 'utf-8');
            users = JSON.parse(data);
        } catch (error) {
            console.error("Error reading JSON:", error);
        }

        const userIndex = users.findIndex(usuario => usuario.id === parseInt(id));

        if (userIndex != -1) {
            users[userIndex].nombre = nombre
            users[userIndex].apellido = apellido
            users[userIndex].email = email
            users[userIndex].password = password

            await fs.writeFile(PATH, JSON.stringify(users));
            res.status(200).send(`User ${nombre} updated`);
        }
        res.send("User not found");
        
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.status(500).send("Error interno del servidor");
    }
})

app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        let users = [];
        try {
            const data = await fs.readFile(PATH, 'utf-8');
            users = JSON.parse(data);
        } catch (error) {
            console.error("Error reading JSON:", error);
        }

        const userIndex = users.findIndex(user => user.id === parseInt(id));
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
            await fs.writeFile(PATH, JSON.stringify(users));
            res.status(200).send(`User deleted`);
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        res.status(500).send("Error interno del servidor");
    }
});


app.listen(port, ()=>{
    console.log(`server on port ${port}`)
})

