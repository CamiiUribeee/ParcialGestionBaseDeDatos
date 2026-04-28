import { checkSchema } from "express-validator";

export const postUsuarioValidator = checkSchema({
    nombre: {
        isString: {
            errorMessage: 'El nombre debe ser un texto'
        },
        isLength:{
            options: {min: 1},
            errorMessage: 'El nombre debe tener minimo un carácter'
        },
        notEmpty: true,
        errorMessage: 'Nombre Inválido'
    },

    correo: {
        isEmail: {
            errorMessage: 'El correo no es válido'
        },
        notEmpty: {
            errorMessage: 'El correo no puede ir vacío'
        },
        normalizeEmail: true
    },

    saldo: {
        isNumeric: {
            options: {
                min : 0
            },
            errorMessage: 'Debe ser un numero mayor o superior a cero (0)'
        }
    },

    pais: {
        isString: {
            errorMessage: 'El país debe ser un texto'
        },
        notEmpty: true,
        errorMessage: 'País no valido',

    }
}, ["body"])

export const deleteUsuarioValidator = checkSchema({

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

}, ["params"])

export const updateUserValidator = checkSchema({
    id: {
        in: ["params"],
        isMongoId: {
            errorMessage: 'Debe ser un id de Mongo'
        }
    },
    nombre: {
        in:["body"],
        isString: {
            errorMessage: 'El nombre debe ser un texto'
        },
        isLength:{
            options: {min: 1},
            errorMessage: 'El nombre debe tener minimo un carácter'
        },
        notEmpty: true,
        errorMessage: 'Nombre Inválido'
    },
    correo: {
        in: ["body"],
        matches: {options:'^[a-zA-Z0-9.\-+_]+@gmail\.com$'},
        errorMessage: 'El correo debe ser de gmail'
    }


})