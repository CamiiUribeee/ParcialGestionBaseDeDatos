import { MongoClient } from "mongodb";
import fs from "fs"

import {EJSON} from "bson";

const uri = "mongodb://localhost:27017"
const dbName = "test"
const patch = "./database/backup"
const fecha ="2026-04-20.json"
const DROP_COLLECTION = true

async function restore(params) {
    const client = new MongoClient(uri)
    try{
        console.log("...................:::: Conectado a Mongo ::::........................")
        await client.connect()
        console.log("✅ Conectado a Mongo")

        const db = client.db(dbName)
        console.log("..........:::: Leyendo archivos :::::............")
        const files = fs.readdirSync(patch).filter(f=>f.endsWith(fecha))
        console.log("✅ Archivos leidos")

        for( const file of files){
            console.log("...::: Leyendo archivos :::...............")
            const collectionName = file
            .replace(/^test_/,"")
            .replace(/_\d{4}-\d{2}-\d{2}\.json$/,"")
            console.log(`Nombre resultante: ${collectionName}` );
            
            const raw = fs.readFileSync(`${patch}/${file}`);
            const data = EJSON.parse(raw)

            if(!Array.isArray(data) || data.length === 0){
                console.log("❌  Datos vacios")
            }
            const collection = db.collection(collectionName)

            if(DROP_COLLECTION){
                await collection.deleteMany({});
            }
            console.log(`....:::::::::: INSERTANDO DATOS ::::::::::......... ${collectionName}`)
            await collection.insertMany(data)
            console.log(`....:::::::::: INSERTANDO DATOS ✅ ::::::::::......... ${collectionName}`)
        }
        console.log("Todo restaurado")

    }
    catch(e){
        console.log(e)
    }
    finally{
        await client.close();
    }
}

restore()