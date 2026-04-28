import jwt from "jsonwebtoken"

export const generateToken = (data) => {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + ( 60 * 60),
        data: {
            'role' : 'administrador',
            'usuario' : data.username
        }
    }, 'secreto_exemplo_changeme')
}