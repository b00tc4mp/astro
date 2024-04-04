import { userModel } from "../models/users.model.js"; 

const getAllUsers = async (req, res) => {   
    try {
        const users = await userModel.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send("Get users error: " + error.message);        
    }
 }
 
const getUser = async (req, res) => { 
    try {
        const { id } = req.params
        const users = await userModel.findById(id);
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send('Get user error : '+ error.message);        
    }
 }

const updateUser = 
    async (req, res)=> {
        const { uid } = req.params
        const { nombre, apellido, email, password } = req.body;
        try { 
    
            console.log("ID del usuario:", uid);
            const existUser = await userModel.exists({_id: uid })      
            if (!existUser) {
                return res.status(400).send("User not found");
            }
            const updateUser = await userModel.findByIdAndUpdate(uid, { nombre, apellido, email, password}, { new: true});
            
            res.status(200).send(updateUser)
        } catch (error) {
            res.status(500).send("Update User error: " + error.message);
        }
    }
    
const deleteUser = async (req, res) => {
    const { uid } = req.params;
    try {
        const deletUser = await userModel.findByIdAndDelete(uid) 
        res.status(200).send({message: "User deleted", deletUser: deletUser})
    } catch (error) {
        res.status(400).send("User not found: " + error.message)
    }
}

const userController = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}

 export default userController 