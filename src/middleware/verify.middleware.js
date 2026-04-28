import jwt from "jsonwebtoken"

export const verifiyToken = (req,res,next) => {
    const token = req.headers["authorization"];

    if(!token){
        return res.status(401).json({
            success: false,
            msg: "usuario no autorizado"
        })
    }

    const tokenSplit = token.split(" ")
    console.log(tokenSplit)
    if(tokenSplit[0] != 'Bearer') {
         return res.status(401).json({
            success: false,
            msg: "Authorization invalid"
        })
    }

    jwt.verify(tokenSplit[1], 'secreto_exemplo_changeme', (err, decode) => {
        console.log(err)
        if(err){
            
            return res.status(401).json({
                success: false,
                msg: "No Autorizado"
            })
        }
        next();
    })
}