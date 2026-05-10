import { checkSchema } from "express-validator";

export const postEventoValidator = checkSchema({

    deporte: {
        isString: {
            errorMessage: 'El deporte debe ser un texto'
        },
        notEmpty: {
            errorMessage: 'El deporte es obligatorio'
        },
        trim: true,
        isLength: {
            options: { min: 3, max: 50 },
            errorMessage: 'El deporte debe tener entre 3 y 50 caracteres'
        }
    },

    fecha: {
        notEmpty: {
            errorMessage: 'La fecha es obligatoria'
        },
        isDate: {
            errorMessage: 'La fecha debe tener el formato YYYY-MM-DD'
        },
        custom: {
            options: (value) => {
                const fechaEvento = new Date(value);
                const hoy = new Date();
                hoy.setHours(0, 0, 0, 0);
                if (fechaEvento < hoy) {
                    throw new Error('La fecha del evento no puede ser en el pasado');
                }
                return true;
            }
        }
    },
    cuotas: {
        isObject: {
            errorMessage: 'Las cuotas deben ser un objeto'
        },
        notEmpty: {
            errorMessage: 'Las cuotas son obligatorias'
        },
        custom: {
            options: (value) => {
                const keys = Object.keys(value);

                if (keys.length < 2) {
                    throw new Error('Debe haber al menos 2 cuotas');
                }

                for (const key of keys) {
                    if (typeof value[key] !== 'number') {
                        throw new Error(`La cuota "${key}" debe ser un número`);
                    }
                    if (value[key] <= 1) {
                        throw new Error(`La cuota "${key}" debe ser mayor a 1`);
                    }
                }

                return true;
                }
            }
        },

}, ["body"]);

export const deleteEventoValidator = checkSchema({

    id: {
        notEmpty: {
            errorMessage: 'El id no puede estar vacío'
        },
        exists: {
            errorMessage: 'El usuario no existe'
        },
        isMongoId: {
            errorMessage: 'Debe ser un id de mongo'
        }
    }
}, ['params'])

export const updateEventoValidator = checkSchema({

    id: {
        notEmpty: {
            errorMessage: 'El id no puede estar vacío'
        },
        exists: {
            errorMessage: 'El usuario no existe'
        },
        isMongoId: {
            errorMessage: 'Debe ser un id de mongo'
        }
    },

    deporte: {
        isString: {
            errorMessage: 'El deporte debe ser un texto'
        },
        notEmpty: {
            errorMessage: 'El deporte es obligatorio'
        },
        trim: true,
        isLength: {
            options: { min: 3, max: 50 },
            errorMessage: 'El deporte debe tener entre 3 y 50 caracteres'
        }
    },

    fecha: {
        notEmpty: {
            errorMessage: 'La fecha es obligatoria'
        },
        isDate: {
            errorMessage: 'La fecha debe tener el formato YYYY-MM-DD'
        },
        custom: {
            options: (value) => {
                const fechaEvento = new Date(value);
                const hoy = new Date();
                hoy.setHours(0, 0, 0, 0);
                if (fechaEvento < hoy) {
                    throw new Error('La fecha del evento no puede ser en el pasado');
                }
                return true;
            }
        }
    },
    cuotas: {
        isObject: {
            errorMessage: 'Las cuotas deben ser un objeto'
        },
        notEmpty: {
            errorMessage: 'Las cuotas son obligatorias'
        },
        custom: {
            options: (value) => {
                const keys = Object.keys(value);

                if (keys.length < 2) {
                    throw new Error('Debe haber al menos 2 cuotas');
                }

                for (const key of keys) {
                    if (typeof value[key] !== 'number') {
                        throw new Error(`La cuota "${key}" debe ser un número`);
                    }
                    if (value[key] <= 1) {
                        throw new Error(`La cuota "${key}" debe ser mayor a 1`);
                    }
                }

                return true;
                }
            }
        },

}, ["body", "params"])