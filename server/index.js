import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4"
import axios from "axios";

async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
         type User{
            id:String!
            name:String!
            email:String!
         }
         type Todo {
            userId:String!
            id:String!
            title:String!
            completed:Boolean
            user:User
         }

         type Query {
            getTodos:[Todo]
            getTodosById(id:String):Todo
         }
         `,
        resolvers: {
            Todo:{
                user:async(todo) => {
                    let data = await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`);
                    return data.data;
                }
            },
            Query: {
                getTodos: async () => {
                    let data = await axios.get("https://jsonplaceholder.typicode.com/todos");
                    return data.data;
                },
                getTodosById: async (parent, { id }) => {
                    let data = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
                    return data.data;
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