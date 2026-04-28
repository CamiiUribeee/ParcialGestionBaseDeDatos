import modelApuesta from "../redis/apuesta.model.js"

export const getApuesta = async(req,res) =>{
    const data = await redis.get('info:03578');
    const json = JSON.parse(data)
    console.log(json)
    res.send(json)
}

export const save = async(req,res) =>{
    const json = req.body;
    console.log("*****************")
    console.log(json)
    console.log("**************")
   

    modelApuesta.saveApuesta(json)

}

export const update = async(req,res) => {
    const edad = 20;
    const data = await redis.get('info:03578');
    if(!data){
        return res.json({'success':false, 'data':[], 'msg': 'Not found'}, 404)
    }
    let json = JSON.parse(data);
    json.edad = edad;
    let a = await redis.set('info:03578', 
        JSON.stringify(json),{
            EX:300
        }
    )
    res.send({"success": a === 'OK' , data: json, msg:a});
}

export const hset = async(req,res) => {
     const response = await redis.hSet('info:192197',{
        'name' : "Keiner",
        'lastname': "Martinez",
        'age' :32
    });

    await redis.expire('info:192197', 300)
    res.send(response);
}

export const deleteTwo = async(req,res) => {
    // const data = await redis.del('info:192197')
    const data = await redis.hDel('info:192197', 'age')
    const response = await redis.hGetAll('info:192197')
    res.send(response);
}

export const getHash = async (req,res) => {
     const response = await redis.hGetAll('info:192197');
    const ttl = await redis.ttl('info:192197')
    res.json({success: true, data: response, ttl})
}

export default {
    getApuesta,
    save_dos : save,
    update,
    hset,
    deleteTwo,
    getHash
}