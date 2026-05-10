import { ObjectId } from "mongodb";
import { connectionTournament } from "../services/mongo.service.js";
import { deleteApuestaModel } from "./apuesta.model.js";
import { USUARIO_COLLECTION } from "../constants/usuario.const.js";
import { APUESTA_COLLECTION } from '../constants/apuesta.const.js';
import { EVENTO_COLLECTION } from "../constants/evento.const.js";

export const getUsuarioModel = async () => {
    const connection = await connectionTournament();
    const result = await connection.collection(USUARIO_COLLECTION).find({}).toArray();
    return result;
}

export const postUsuarioModelUnico = async (json) => {
    console.log(JSON.stringify(json));
    const connection = await connectionTournament();
    const tournament = connection.collection(USUARIO_COLLECTION);
    const result = await tournament.insertOne(json);
    return result;
}

export const postUsuarioModelMultiple = async (json) => {
    const connection = await connectionTournament();
    const tournament = connection.collection(USUARIO_COLLECTION);
    const result = await tournament.insertMany(json);
    return result;
}

export const updateSaldo = async (id) => {
    const connection = await connectionTournament();

    const usuario = await connection.collection(USUARIO_COLLECTION).findOne({
        _id: new ObjectId(id)
    });

    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    const apuestasGanadas = await connection.collection(APUESTA_COLLECTION).find({
        usuario_id: new ObjectId(id),
        estado: "ganada",
    }).toArray();

    if (apuestasGanadas.length === 0) {
        return {
            msn: "No hay apuestas ganadas pendientes",
            saldo_actual: usuario.saldo,
            ganancias_totales: 0
        };
    }

    //CORRECION, OJO
    let gananciasTotales = 0;

    for (const apuesta of apuestasGanadas) {
        gananciasTotales += apuesta.posible_ganancia;
    }

    const saldoActual = Number(usuario.saldo) || 0;
    const nuevoSaldo = saldoActual + gananciasTotales;

    const updateResult = await connection.collection(USUARIO_COLLECTION).updateOne(
        { _id: new ObjectId(id) },
        { $set: { saldo: nuevoSaldo } }
    );

    //NUEVA CORECCION
    if (updateResult.matchedCount === 0) {
        throw new Error("Usuario no encontrado para actualizar");
    }

    return {
        msn: "Apuestas ganadas procesadas exitosamente",
        ganancias_totales: gananciasTotales,
        saldo_anterior: saldoActual,
        saldo_nuevo: nuevoSaldo,
        apuestas_procesadas: apuestasGanadas.length
    };
}

export const searchUsuarioModel = async (saldo) => {
    const connection = await connectionTournament();
    const result = await connection.collection(USUARIO_COLLECTION).find({ saldo: { $gt: parseFloat(saldo) } }).toArray();
    return result;
}

export const usuarioPaisCorreo = async () => {
    const connection = await connectionTournament();

    const eventosBaloncesto = await connection.collection(EVENTO_COLLECTION).find(
        { deporte: "baloncesto" },
        { projection: { _id: 1 } }
    ).toArray();

    if (eventosBaloncesto.length === 0) {
        return {
            msn: "No se encontraron eventos de baloncesto",
            data: []
        };
    }

    const eventosIds = eventosBaloncesto.map(e => e._id);

    const apuestas = await connection.collection(APUESTA_COLLECTION).find({
        evento_id: { $in: eventosIds }
    }).toArray();

    if (apuestas.length === 0) {
        return {
            msn: "No hay apuestas para eventos de baloncesto",
            data: []
        };
    }

    const usuariosIds = [...new Set(apuestas.map(apuesta => apuesta.usuario_id.toString()))];

    const usuarios = await connection.collection(USUARIO_COLLECTION).find({
        _id: { $in: usuariosIds.map(id => new ObjectId(id)) }
    }, {
        projection: {
            pais: 1,
            correo: 1,
            _id: 0
        }
    }).toArray();

    return {
        msn: "Usuarios que apostaron en baloncesto",
        total_apostadores: usuarios.length,
        data: usuarios
    };
}

export const deleteUsuarioModel = async (id) => {
    const connection = await connectionTournament();
    const apuestasEliminadas = await deleteApuestaModel(id);
    const result = await connection.collection(USUARIO_COLLECTION).deleteOne({ _id: new ObjectId(id) });
    return {
        msn: `Usuario con ID ${id} eliminado`,
        usuario_eliminado: result,
        apuestas_eliminadas: apuestasEliminadas.deletedCount,
        result
    };
}

export const totalApostado = async () => {
    const connection = await connectionTournament();
    const result = await connection.collection(APUESTA_COLLECTION).aggregate([
        {
            $group: {
                _id: "$usuario_id",
                total: { $sum: "$monto_apostado" }
            }
        },
        {
            $lookup: {
                from: "usuarios",
                localField: "_id",
                foreignField: "_id",
                as: "usuario"
            }
        },
        { $unwind: "$usuario" },
        {
            $project: {
                _id: 0,
                nombre: "$usuario.nombre",
                correo: "$usuario.correo",
                total_apostado: { $round: ["$total", 2] }
            }
        },
        { $sort: { total_apostado: -1 } }
    ]).toArray();

    return result;
}

export const getUsuariosMayorGanancia = async () => {
    const connection = await connectionTournament();

    const resultado = await connection.collection(APUESTA_COLLECTION).aggregate([
        {
            $match: { estado: "ganada" }
        },
        {
            $group: {
                _id: "$usuario_id",
                ganancia_total: { $sum: "$posible_ganancia" },
                total_apuestas_ganadas: { $sum: 1 },
                monto_total_apostado: { $sum: "$monto_apostado" }
            }
        },
        {
            $lookup: {
                from: "usuarios",
                localField: "_id",
                foreignField: "_id",
                as: "usuario"
            }
        },
        { $unwind: "$usuario" },
        { $sort: { ganancia_total: -1 } },
        {
            $project: {
                _id: 0,
                usuario_id: "$_id",
                nombre: "$usuario.nombre",
                correo: "$usuario.correo",
                pais: "$usuario.pais",
                saldo_actual: "$usuario.saldo",
                ganancia_total: { $round: ["$ganancia_total", 2] },
                total_apuestas_ganadas: 1,
                monto_total_apostado: { $round: ["$monto_total_apostado", 2] }
            }
        }
    ]).toArray();

    return resultado;
}

export default {
    getUsuarioModel,
    postUsuarioModelUnico,
    postUsuarioModelMultiple,
    updateSaldo,
    searchUsuarioModel,
    usuarioPaisCorreo,
    deleteUsuarioModel,
    totalApostado,
    getUsuariosMayorGanancia
}