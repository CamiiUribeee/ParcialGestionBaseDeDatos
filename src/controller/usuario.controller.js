import usuariomodel from "../models/usuariomodel.js"

export const getUsuario = async(req,res) => {

    const data = await usuariomodel.getUsuarioModel();
    return res.status(200).json({"msn":"Hello getUser",data})
}

export const postUsuario = async(req,res) => {
    const json = req.body;
    const result = await usuariomodel.postUsuarioModelUnico(json);
    res.send({data: json})
}

export const postUsuarioMultiple = async(req,res) => {
    const json = req.body;
    const result = await usuariomodel.postUsuarioModelMultiple(json);
    res.send({data: json})
}


export const updateSaldo = (req,res) => {
    const {id} = req.param
    const result = usuariomodel.updateSaldo(id)
     return res.status(200).json({ "msn": "Saldo de usuario actualizado ", result })
}   

export const searchUsuario = async(req,res) => {
    const saldo = req.params.saldo;
    const data = await usuariomodel.searchUsuarioModel(saldo)
    return res.status(200).json({"msn":"data",data})
}

export const usuarioPaisCorreo = async(req,res) => {
    const data = await usuariomodel.usuarioPaisCorreo()
    return res.status(200).json({"msn":"data",data})
}

export const deleteUsuario = async(req,res) => {
    const {id} = req.params;
    const result = await usuariomodel.deleteUsuarioModel(id);
     return res.status(200).json({ "msn": `Usuario con ID ${id} eliminado`, result })
}   

export const totalApostado = async(req,res) => {
    const id = req.params
    const data = await usuariomodel.totalApostado(id)
    return res.status(200).json({"msn":"data",data})
}

export default {
    getUsuario,
    postUsuario,
    postUsuarioMultiple,
    updateSaldo,
    deleteUsuario,
    searchUsuario,
    usuarioPaisCorreo,
    deleteUsuario,
    totalApostado
}