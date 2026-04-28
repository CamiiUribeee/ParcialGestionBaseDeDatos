
import { ObjectId } from "mongodb";
import { connectionTournament } from "../services/mongo.service.js"
import { deleteApuestaModel } from "./apuesta.model.js";
import { USUARIO_COLLECTION } from "../constants/usuario.const.js";
import { APUESTA_COLLECTION} from '../constants/apuesta.const.js';
import { EVENTO_COLLECTION } from "../constants/evento.const.js";

export const getUsuarioModel = async() =>{
    const connection = await connectionTournament();
    const result = await connection.collection(USUARIO_COLLECTION).find({}).toArray();
    return result;
}

export const postUsuarioModelUnico = async(json) =>{
    console.log(JSON.stringify(json))
    const connection = await connectionTournament();
    const tournament = connection.collection(USUARIO_COLLECTION)
    const result = await tournament.insertOne(json)
    return result;
}

export const postUsuarioModelMultiple = async (json) =>{
    const connection = await connectionTournament();
    const tournament = connection.collection(USUARIO_COLLECTION)
    const result = await tournament.insertMany(json)
    return result;
}

//Terminar la funcion de actualizar el saldo de un usuario 
export const updateSaldo = async (id) => {
    const connection = await connectionTournament();
    const usuario = await connection.collection(USUARIO_COLLECTION).find({_id: new ObjectId(id)});

    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    const apuestasGanadas = await connection.collection(APUESTA_COLLECTION).find({usuario_id: new ObjectId(id), estado :"ganada"}).toArray();

    if (apuestasGanadas.length === 0) {
        return {
            msn: "No hay apuestas ganadas pendientes de pago",
            saldo_actual: usuario.saldo,
            ganancias_totales: 0
        };
    }

    let gananciasTotales = 0;

    for (const apuesta of apuestasGanadas) {
        gananciasTotales += apuesta.monto * apuesta.cuota;
    }

    const nuevoSaldo = usuario.saldo + gananciasTotales;

    await connection.collection(USUARIO_COLLECTION).updateOne({ 
        _id: new ObjectId(id) }, { 
        $set: { saldo: nuevoSaldo }
    })


    return {
        msn: "Apuestas ganadas procesadas",
        ganancias_totales: gananciasTotales,
        saldo: nuevoSaldo
    };

}

export const searchUsuarioModel = async (saldo) => {
    const connection = await connectionTournament();
    const result = await connection.collection(USUARIO_COLLECTION).find({saldo: { $gt: parseFloat(saldo)}}).toArray();
    return result;
}

export const usuarioPaisCorreo = async() => {
    const connection = await connectionTournament();
    const eventoBaloncesto = await connection.collection(EVENTO_COLLECTION).findOne(
        { deporte: "Baloncesto" }, 
        { projection: { _id: 1 } }  
    );
    
    if (!eventoBaloncesto) {
        return {
            msn: "No se encontraron eventos de baloncesto",
            data: []
        };
    }
    
    const apuestas = await connection.collection(APUESTA_COLLECTION).find({
        evento_id: eventoBaloncesto._id.toString()  
    }).toArray();
    
    if (apuestas.length === 0) {
        return {
            msn: "No hay apuestas para eventos de baloncesto",
            data: []
        };
    }
    
    
    const usuariosIds = [...new Set(apuestas.map(apuesta => apuesta.usuario_id))];
    
    const usuarios = await connection.collection(USUARIO_COLLECTION).find({
        _id: { $in: usuariosIds.map(id => new ObjectId(id)) }
    }, {
        projection: { 
            país: 1,      
            correo: 1,    
            _id: 0        
        }
    }).toArray();
    
    return {
        msn: `Usuarios que apostaron en baloncesto (evento: ${eventoBaloncesto._id})`,
        total_apostadores: usuarios.length,
        data: usuarios
    };
}

export const deleteUsuarioModel = async (id) => {
    const connection = await connectionTournament();
    const apuestasEliminadas = deleteApuestaModel(id);
    const result = await connection.collection(USUARIO_COLLECTION).deleteOne({_id: new ObjectId(id)});
     return {
        msn: `Usuario con ID ${id} eliminado`,
        usuario_eliminado: result,
        apuestas_eliminadas: apuestasEliminadas.deletedCount,
        result
    };
}

export const totalApostado = async(id) => {
    const connection = await connectionTournament();
    const id_mongo = new ObjectId(id)
    const result = await connection.collection(APUESTA_COLLECTION).aggregate([
        {
            $group: {
                _id: id_mongo,
                total: { $sum: "$monto" }
            }
        }
    ]).toArray();

    return result[0]?.total || 0;
}


export default{
    getUsuarioModel,
    postUsuarioModelUnico,
    postUsuarioModelMultiple,
    updateSaldo,
    searchUsuarioModel,
    usuarioPaisCorreo,
    deleteUsuarioModel,
    totalApostado
}