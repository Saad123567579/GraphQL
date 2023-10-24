import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4"

async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
         type Todo {
            id:String!
            title:String!
            completed:Boolean
         }

         type Query {
            getTodos:[Todo]
         }
         `,
        resolvers:{
            Query :{
                getTodos: () => {
                    return [{id:"2",title:"abc",completed:true}]
                }
            }
        }
    });
    app.use(bodyParser.json());
    app.use(cors());
    await server.start();
    app.use("/graphql", expressMiddleware(server));
    app.listen(8000, () => { console.log("Server Staretd At 8000") })
}

startServer()