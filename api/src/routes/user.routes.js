import { Router } from "express";
import { userModel } from "../models/users.model";

const routerUser = Router()

routerUser.get('/', async (req, res) => { 
    try {
        const users = await userModel.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send("Error al consultar usuario: ", error);        
    }
 });

routerUser.get('/:id', async (req, res) => { 
    const { id } = req.params
    try {
        const users = await userModel.findById(id);
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send('Error al consultar usuario: ', error);        
    }
 });

routerUser.post('/users', async (req, res) => {
    
    try {
        const { nombre, apellido, email, password } = req.body;

        const result = await userModel.create(
            {
                nombre, apellido, edad, password, email
            })
            res.status(200).send(result)
             
    } catch (error) {

        res.status(500).send("Error interno del servidor");
    }
});

routerUser.put('/users/:id', async (req, res)=> {

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

routerUser.delete('/users/:id', async (req, res) => {
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

export default routerUser
