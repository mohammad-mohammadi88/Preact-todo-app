import express from "express";
import todosRouter from "./routes/todos.js"
import cors from "cors"
import bodyParser from "body-parser";
import { logger } from "./middleware/logger.js";
const app = express();
const port = 4000;

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(logger)
app.use('/todos',todosRouter)

app.listen(port,()=>{
    console.log('server is on on port ' + port)
})