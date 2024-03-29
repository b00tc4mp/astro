import { Router } from "express";
import { userModel } from "../models/users.model.js";

const routerUser = Router()

routerUser.get('/', async (req, res) => { 
    
    try {
        const users = await userModel.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send("Get users error: " + error.message);        
    }
 });

routerUser.get('/:id', async (req, res) => { 
    
    try {
        const { id } = req.params
        const users = await userModel.findById(id);
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send('Get user error : '+ error.message);        
    }
 });

routerUser.post('/', async (req, res) => {
    
    try {
        const { nombre, apellido, email, password } = req.body;

        const result = await userModel.create(
            {
                nombre, apellido, password, email
            })
            res.status(200).send(result)

    } catch (error) {

        res.status(500).send("Internal Server error: " + error.message);
    }
});

routerUser.put('/:id', async (req, res)=> {

    const { uid } = req.params
    const { nombre, apellido, email, password } = req.body;

    try { 
        const existUser = await userModel.exists({_id: uid })

        if (!existUser) {
            return res.status(400).send("User not found");
        }
        const updateUser = await userModel.findByIdAndUpdate(uid, { nombre, apellido, email, password}, { new: true});
        
        res.status(200).send(updateUser)

    } catch (error) {
        res.status(500).send("Update User error: " + error.message);
    }
})

routerUser.delete('/:id', async (req, res) => {
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
