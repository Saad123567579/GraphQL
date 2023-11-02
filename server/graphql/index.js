import { ApolloServer } from "@apollo/server";
// import {User} from "./user/index.js";
import { User } from "./user";
async function createServer() {

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
            Todo: {
                user: async (todo) => {
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
            // Mutation: {
                
            // }
        }
    });
    await server.start()
    return server;


}

export default createServer;

