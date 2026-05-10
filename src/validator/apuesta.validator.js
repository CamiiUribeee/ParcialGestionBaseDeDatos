import { checkSchema } from "express-validator";

import { checkSchema } from "express-validator";

export const postApuestaValidator = checkSchema({

    usuario_id: {
        notEmpty: {
            errorMessage: 'El usuario_id es obligatorio'
        },
        isMongoId: {
            errorMessage: 'El usuario_id debe ser un id de MongoDB válido'
        }
    },

    evento_id: {
        notEmpty: {
            errorMessage: 'El evento_id es obligatorio'
        },
        isMongoId: {
            errorMessage: 'El evento_id debe ser un id de MongoDB válido'
        }
    },

    monto_apostado: {
        notEmpty: {
            errorMessage: 'El monto apostado es obligatorio'
        },
        isFloat: {
            options: { min: 1000 },
            errorMessage: 'El monto apostado debe ser un número mayor a 1000'
        }
    },

    estado: {
        notEmpty: {
            errorMessage: 'El estado es obligatorio'
        },
        isIn: {
            options: [['pendiente', 'ganada', 'perdida']],
            errorMessage: 'El estado debe ser: pendiente, ganada o perdida'
        }
    },

    cuota_seleccionada: {
        notEmpty: {
            errorMessage: 'La cuota seleccionada es obligatoria'
        },
        isFloat: {
            options: { min: 1.01 },
            errorMessage: 'La cuota seleccionada debe ser un número mayor a 1'
        }
    }

}, ["body"]);


export const deleteApuestaValidator = checkSchema({

    id: {
        notEmpty: {
            errorMessage: 'El id no puede estar vacío'
        },
        isMongoId: {
            errorMessage: 'Debe ser un id de MongoDB válido'
        }
    }

}, ["params"]);


export const updateApuestaValidator = checkSchema({

    id: {
        notEmpty: {
            errorMessage: 'El id no puede estar vacío'
        },
        isMongoId: {
            errorMessage: 'Debe ser un id de MongoDB válido'
        }
    },

    estado: {
        optional: true,
        isIn: {
            options: [['pendiente', 'ganada', 'perdida']],
            errorMessage: 'El estado debe ser: pendiente, ganada o perdida'
        }
    },

    monto_apostado: {
        optional: true,
        isFloat: {
            options: { min: 1000 },
            errorMessage: 'El monto apostado debe ser un número mayor a 1000'
        }
    },

    cuota_seleccionada: {
        optional: true,
        isFloat: {
            options: { min: 1.01 },
            errorMessage: 'La cuota seleccionada debe ser un número mayor a 1'
        }
    },

    posible_ganancia: {
        optional: true,
        isFloat: {
            options: { min: 0 },
            errorMessage: 'La posible ganancia debe ser un número positivo'
        }
    }

}, ["body", "params"]);
