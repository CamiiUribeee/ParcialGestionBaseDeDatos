import { validationResult } from "express-validator";

export const validate = (validations) => async (req,res,next) => {
    await Promise.all(validations.map((validation) => validation.run(req)))

    const errors = validationResult(req);

    if(errors.isEmpty()){
        return next();
    }

    //422 Unprocessable Content
    res.status(422).json({
        msg: 'Datos Inválidos',
        errors: errors.array()
    })
}  