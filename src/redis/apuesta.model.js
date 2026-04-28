import { getConnection } from "../services/redis.service.js"

const saveApuesta = async(json) => {
    const redis = await getConnection()
     let a = await redis.set('info:03578',
         JSON.stringify(json), {
            EX:300
       })
    return a;
}

const getApuesta = async(req,res) =>{
    const data = await redis.get('info:03578');
    const json = JSON.parse(data)
    console.log(json)
     res.send(json)
}


export default{
    saveApuesta, getApuesta
}