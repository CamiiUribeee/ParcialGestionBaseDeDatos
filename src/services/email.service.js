import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kballesterosm@ufpso.edu.co',
        pass: 'vtml xkom iwnt oogz'
        
    },
    tls: {
        rejectUnauthorized: false
    }
});

export const sendEmail = async(otp) => {

    return await transporter.sendMail({
       from:'"Apuestas Mongo" <kballesterosm@ufpso.edu.co>', 
       to:'ballesteroskeiner1@gmail.com',
       subject:'OTP de inicio de sesión "Apuestas Mongo"',
       html: `
        <div>
            <h1Ejemplo Apuestas Mongo</h1>
            <p>Por favor para iniciar sesión digite el codigo OPT generado</p>
            <div style='color:white; margin: 0 auto; text-aling:center; width 14em; background: #55555; padding: 0.5em; border-radius:5px;'>
                ${otp}
            </div>
        </div>
       `
    });
}