import express from "express";
import {Router} from "express"
import { MongoClient, ObjectId } from "mongodb";


const router = Router();

router.use(express.json())

// driver :// usuario:contraseña @ ip:port / nombre base de datos
const client = new MongoClient("mongodb://localhost:27017")


const connection = async() => {
    try{
        await client.connect();
        return client.db("test")
    }catch(e){
        console.log("===================ERROR================")
        console.log(e);
    }
}

router.get("/post", async(req,res) =>{
    const db = await connection();
    const tournament = db.collection("tournament")
    const result = tournament.insertOne({
        "nombre" : "Keiner",
        "apellido" : "Ballesteros"
    })

    res.json(result)
} )

router.get("/getmongo/:id", async (req,res)=> {
    const { id } = req.params;
    const db = await connection();
    const tournament = db.collection("tournament")
    console.log(id);
    const objectId = new ObjectId(id)
    const result = await tournament.findOne({
        nombre : "Keiner"
    })
    res.json(result)
})


router.post("/savetournament", async (req,res) =>{
    const db = await connection();
    const tournament = db.collection("tournament")
    console.log(req.body)
     const result = await tournament.insertOne(req.body)
    res.json(result)
}) 

router.post("/savetorneos", async (req,res) =>{
    const db = await connection();
    const tournament = db.collection("tournament")
    const result = await tournament.insertMany(req.body)
    res.json(result)
}) 

// $ne -> diferente
// $gt ->mayor que 
// $gte ->mayor igual que
// $lt -> menor que
// $lte ->menor igual que
// $in -> dentro del arreglo
// $nin -> negacion del arreglo

router.get("/getTorneo", async (req,res) => {
    const db = await connection();
    const tournament = db.collection("tournament")
    const filtro = {
         location: "Cucuta",
         premio : { $lt : 1000}
    }
    const view = {
        nombre :0,
        premio :0
    }
    const data = await tournament.find(filtro, view).toArray();
    res.json(data)
})
export default router;