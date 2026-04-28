import express from 'express'
import IndexRoute from "../router/index.router.js"
import { verifiyToken } from '../middleware/verify.middleware.js';

export default class Server{

    constructor(){
        this.app = express();
        this.port = 8080;
    }

    async connectionDB(){

    }
    
    middleware(){
        this.app.use(express.json())
        this.app.use("/api", verifiyToken)
    }

    route(){
        this.app.use(IndexRoute)
    }


    runServer(){
        this.connectionDB()
        this.middleware()
        this.route()
        this.app.listen(this.port, () =>{
            console.log(`Server run in ${this.port}`);
        })
    }
}


