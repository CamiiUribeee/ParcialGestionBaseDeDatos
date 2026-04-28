import { generateToken } from "../services/token.service.js";

export const  auth = (req,res) => {
    const {username, password} = req.body;

    try{
        if(username !== 'cristian' || password !== '1234')
        {
        throw new Error("Credenciales inválidas")
        }

        return res.json({
        'success': true,
        'token': generateToken({username})
        })
    }catch(e){
        return res.status(401).json({
            'data': 'datos invalidos',
            "success": false,
        })
    }
    
}