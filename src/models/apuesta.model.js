import { connectionTournament } from "../services/mongo.service.js";
import { ObjectId } from "mongodb";
import { APUESTA_COLLECTION} from '../constants/apuesta.const.js'




export const getApuestaModel = async () => {
    const connection = await connectionTournament();
    const result = await connection.collection(APUESTA_COLLECTION).find({}).toArray();
    return result;
}

export const getApuestaPorUsuarioModel = async (usuarioId) => {
    const connection = await connectionTournament();
    const result = await connection.collection(APUESTA_COLLECTION).find({ "usuario_id": usuarioId }).toArray();
    return result;
}

export const getApuestaPorEventoModel = async (eventoId) => {
    const connection = await connectionTournament();
    const result = await connection.collection(APUESTA_COLLECTION).find({ "evento_id": eventoId }).toArray();
    return result;
}

export const postApuestaModel = async (apuestaData) => {
    const connection = await connectionTournament();
    const apuestaCollection = connection.collection(APUESTA_COLLECTION);
    
    const posibleGanancia = apuestaData.monto_apostado * apuestaData.cuota_seleccionada;
    
    const apuestaCompleta = {
        ...apuestaData,
        posible_ganancia: posibleGanancia,
        fecha_apuesta: new Date(),
        estado: "en_curso" 
    };
    
    const result = await apuestaCollection.insertOne(apuestaCompleta);
    return result;
}

export const postApuestaMultiple = async (apuestasData) => {
    const connection = await connectionTournament();
    const apuestaCollection = connection.collection(APUESTA_COLLECTION); 
    const apuestasCompleta = apuestasData.map(apuestaData => {
        const posibleGanancia = apuestaData.monto_apostado * apuestaData.cuota_seleccionada;
        return {
            ...apuestaData,
            posible_ganancia: posibleGanancia,
            fecha_apuesta: new Date(),
            estado: "en_curso" 
        };
    });
    const result = await apuestaCollection.insertMany(apuestasCompleta);
    return result;
}

export const actualizarEstadoApuestaModel = async (apuestaId, nuevoEstado) => {
    const connection = await connectionTournament();
    const apuestaCollection = connection.collection(APUESTA_COLLECTION);
    
    const result = await apuestaCollection.updateOne(
        { _id: new ObjectId(apuestaId) },
        { $set: { estado: nuevoEstado } }
    );
    return result;
}

export const getEnCurso = async() => {
    const connection = await connectionTournament();
    const apuestaCollection = connection.collection(APUESTA_COLLECTION);

    const result = await apuestaCollection.aggregate([
        {
            $match: { estado: 'en curso' }
        },
        {
            $lookup: {
                from: 'usuarios',
                localField: 'usuario_id',
                foreignField: '_id',
                as: 'usuario'
            }
        },
        { $unwind: '$usuario' },
        {
            $lookup: {
                from: 'eventos',
                localField: 'evento_id',
                foreignField: '_id',
                as: 'evento'
            }
        },
        { $unwind: '$evento' },
        {
            $project: {    //lo que se va a mostrar al hacer la consulta, ahí debería quitar monto porque no me lo piden
                _id: 0,
                nombre_usuario: '$usuario.nombre',
                deporte: '$evento.deporte',
                posible_ganancia: 1,
                monto: 1
            }
        }
    ]).toArray();

    return result;
}

export const deleteApuestaModel = async (apuestaId) => {
    const connection = await connectionTournament();
    const apuestaCollection = connection.collection(APUESTA_COLLECTION);
    const result = await apuestaCollection.deleteOne({ _id: new ObjectId(apuestaId) });
    return result;
} 

export const porDeporte = async(nombre) => {
    const connection = await connectionTournament();
    const apuestaCollection = connection.collection(APUESTA_COLLECTION);
    const data = await apuestaCollection.aggregate(
        [   
            {
                $lookup:{
                    from: 'eventos', //de donde voy a sacar los datos
                    localField: 'evento_id', //en mi collection cual campo relaciono
                    foreignField: '_id', //campo externo
                    as: 'evento'
                }
            },
            {
                $unwind: "$evento"
            },
            {
                $match: {
                    "evento.deporte": nombre
                }
            },
            {
                $lookup:{
                    from: 'usuarios', //de donde voy a sacar los datos
                    localField: 'usuario_id', //en mi collection cual campo relaciono
                    foreignField: '_id', //campo externo
                    as: 'usuario'
                }
            },
            {
                $unwind: "$usuario" //corección porque estaba mal 
            },
            {
                $project: {
                    correo: "$usuario.correo",
                    nombre : "$usuario.nombre"
                }
            }

        ]
    ).toArray()
    return data;
}

export const getLookup = async() => {
    const connection = await connectionTournament();
    const apuestaCollection = connection.collection(APUESTA_COLLECTION);
    const data = await apuestaCollection.aggregate(
        [   
            {
                $lookup: {
                    from: 'eventos',
                    localField: 'evento_id',
                    foreignField: '_id',            
                    as: 'evento'
                }
            },
            {
                $unwind: "$evento"
            },  
            {
                $lookup: {
                    from: 'usuarios',
                    localField: 'usuario_id',
                    foreignField: '_id',
                    as: 'usuario'
                }
            },
            {
                $unwind: "$usuario"
            },
            {
                $project: {
                    nombre: "$usuario.nombre",
                    deporte: "$evento.deporte",
                    monto_apostado: "$monto_apostado",  
                    posible_ganancia: "$posible_ganancia", 
                    estado: "$estado"  
                }
            }
        ]
    ).toArray();
    return data;
}
    

export default {
    getApuestaModel,
    getApuestaPorUsuarioModel,
    getApuestaPorEventoModel,
    postApuestaModel,
    actualizarEstadoApuestaModel,
    getEnCurso,
    deleteApuestaModel,
    postApuestaMultiple,
    porDeporte,
    getLookup
};