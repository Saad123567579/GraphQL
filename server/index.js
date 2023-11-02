import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import graphQL from "./graphql/index.js";
import { expressMiddleware } from "@apollo/server/express4"


async function startServer() {
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    const gqlServer = await graphQL();
    app.use("/graphql", expressMiddleware(gqlServer));
    app.get("/",(req,res)=>{  return res.json("The server is up and running") })
    app.listen(8000, () => { console.log("Server Staretd At 8000") })
}

startServer()