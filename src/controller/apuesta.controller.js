import apuestaModel from "../models/apuesta.model.js";
import { ObjectId } from "mongodb";

export const getApuesta = async (req, res) => {
    try {
        const data = await apuestaModel.getApuestaModel();
        return res.status(200).json({ "msn": "Apuestas:", data });
    } catch (error) {
        return res.status(500).json({ "msn": "Error al obtener apuestas", error: error.message });
    }
}

export const getApuestaPorUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const data = await apuestaModel.getApuestaPorUsuarioModel(usuarioId);
        return res.status(200).json({ "msn": `Apuestas del usuario ${usuarioId}`, data });
    } catch (error) {
        return res.status(500).json({ "msn": "Error al obtener apuestas del usuario", error: error.message });
    }
}

export const postApuesta = async (req, res) => {
    try {
        const apuestaData = req.body;
        
        //Validaciones 
        if (!apuestaData.monto_apostado || apuestaData.monto_apostado <= 0) {
            return res.status(400).json({ "msn": "El monto apostado debe ser mayor a 0" });
        }
        
        if (!apuestaData.usuario_id) {
            return res.status(400).json({ "msn": "El ID del usuario es requerido" });
        }
        
        if (!apuestaData.evento_id) {
            return res.status(400).json({ "msn": "El ID del evento es requerido" });
        }
        
        if (!apuestaData.cuota_seleccionada || apuestaData.cuota_seleccionada <= 0) {
            return res.status(400).json({ "msn": "La cuota seleccionada debe ser mayor a 0" });
        }
        
        const result = await apuestaModel.postApuestaModel(apuestaData);
        return res.status(201).json({ 
            "msn": "Apuesta registrada exitosamente", 
            data: apuestaData,
            id_apuesta: result.insertedId.toString()
        });
    } catch (error) {
        return res.status(500).json({ "msn": "Error al registrar apuesta", error: error.message });
    }
}

export const postApuestaMultiple = async (req, res) => {
    try {
        const apuestasData = req.body; // Esperamos un array de apuestas
        if (!Array.isArray(apuestasData) || apuestasData.length === 0) {
            return res.status(400).json({ "msn": "Se requiere un array de apuestas no vacío" });
        }
        const result = await apuestaModel.postApuestaMultiple(apuestasData);
        return res.status(201).json({ 
            "msn": "Apuestas registradas exitosamente",     
            data: apuestasData,
            ids_apuestas: result.insertedIds
        });
    } catch (error) {
        return res.status(500).json({ "msn": "Error al registrar apuestas", error: error.message });
    }
}


export const actualizarEstadoApuesta = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        
        const estadosValidos = ["ganada", "perdida", "en_curso"];
        if (!estadosValidos.includes(estado)) {
            return res.status(400).json({ "msn": "Estado no válido. Usar: ganada, perdida o en_curso" });
        }
        
        const result = await apuestaModel.actualizarEstadoApuestaModel(id, estado);
        
        return res.status(200).json({ "msn": `Apuesta actualizada a ${estado}`, result });
    } catch (error) {
        return res.status(500).json({ "msn": "Error al actualizar apuesta", error: error.message });
    }
}


export const getEnCurso = async(req,res) =>{
    try{
        const result = await apuestaModel.getEnCurso();
        res.json({data:result})
    }
    catch(e){
        console.log(e);
        res.status(500).json({"msn": "Error interno"})
    }
}

export const porDeporte = async(req,res) => {
    const { nombre} = req.params;
    const response = await apuestaModel.porDeporte(nombre)
    return res.send({response});
}

export const getLookup = async(req,res) => {
    const response = await apuestaModel.getLookup();
    return res.send({response});
}


export default {
    getApuesta,
    getApuestaPorUsuario,
    postApuesta,
    actualizarEstadoApuesta,
    getEnCurso,
    postApuestaMultiple,
    porDeporte,
    getLookup
};