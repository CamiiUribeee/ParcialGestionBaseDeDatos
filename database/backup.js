import { MongoClient } from "mongodb";
import fs from "fs"
import {EJSON} from "bson"


const uri = "mongodb://localhost:27017"
const dbName = "test"
const patch = "./database/backup"


async function backup() {
    const client = new MongoClient(uri);
    console.log("...................:::: CONECTANDO BASE DE DATOS ::::........................")
    await  client.connect();
    console.log("✅ Conectado")

    const db = client.db(dbName)

    console.log("...................:::: CONSULTANDO COLLECTIONS ::::........................")
    const collections = await db.listCollections().toArray()
    console.log("...................:::: ✅ COLLECTIONS CONSULTADAS ::::........................")
    const fecha = new Date();
    const fechaYYYYMMDD = fecha.toISOString().slice(0,10);
    for (const collection of collections){
        const data = await db.collection(collection.name).find().toArray();
        const fileName = `${patch}/${dbName}_${collection.name}_${fechaYYYYMMDD}.json`
        fs.writeFileSync(fileName, EJSON.stringify(data, null, 2))
        console.log(`...................:::: BACKUP CREADO ${collection.name} ::::........................`)
    }
}
backup()