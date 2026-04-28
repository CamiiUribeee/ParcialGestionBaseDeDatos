import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb://localhost:27017");

export const connectionTournament = async() => {
    try{
        await client.connect()
        return client.db("test")
    }
    catch(ex){
        console.error(ex)
    }
}