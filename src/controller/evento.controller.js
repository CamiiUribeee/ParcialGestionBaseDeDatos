import eventoModel from "../models/evento.model.js";

export const getEvento = async(req, res) => {
    const data = await eventoModel.getEventoModel();
    return res.status(200).json({ "msn": "Hello getUser", data });
}

export const postEvento = async(req, res) => {
    const json = req.body;
    const result = await eventoModel.postEventoModelUnico(json);
    res.send({ data: json });
}

export const postEventoMultiple = async(req, res) => {
    const json = req.body;
    const result = await eventoModel.postEventoModelMultiple(json);
    res.send({ data: json });
}

export const SearchEvento = async(req, res) => {
    const evento = req.params.evento;
    const data = await eventoModel.SearchEventoModel(evento);
    return res.status(200).json({ "msn": "data", data });
}

export const eventoCuota = async(req, res) => {
    const data = await eventoModel.eventoCuota();
    return res.status(200).json({ "msn": "data", data });
}

export const modificarCuota = async(req, res) => {
    try {
        const { id } = req.params;
        const { nuevaCuota } = req.body;
        const result = await eventoModel.modificarCuota(id, nuevaCuota);
        return res.status(200).json({ msn: "Cuota visitante modificada", result });
    } catch(e) {
        return res.status(500).json({ msn: "Error al modificar la cuota", error: e.message });
    }
}

export const deleteEventoMultiple = async(req, res) => {
    const result = await eventoModel.deleteEventoModel();
    return res.status(200).json({ msn: "Eventos finalizados eliminados", result });
}

export const deleteEvento = async(req, res) => {
    try {
        const { id } = req.params;  // FIX: antes era req.params sin destructuring
        const result = await eventoModel.deleteEvento(id);
        return res.status(200).json({ msn: "Evento eliminado", result }); // FIX: antes no respondía
    } catch(e) {
        return res.status(500).json({ msn: "Error en la eliminación", error: e.message });
    }
}

export const promedioCuota = async(req, res) => {
    const result = await eventoModel.promedioCuota();
    return res.status(200).json({ msn: "Promedio de cuotas", result });
}

export default {
    getEvento,
    postEvento,
    postEventoMultiple,
    SearchEvento,
    eventoCuota,
    modificarCuota,
    deleteEventoMultiple,
    deleteEvento,
    promedioCuota
};