import { ApolloServer } from "@apollo/server";

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

         type Mutation {
            createUser(
                firstName: String
                lastName: String
                email: String
                password: String
            ): Boolean
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
            },
            Mutation :{
                createUser: async (parent, { firstName, lastName, email, password }) => {
                    const client = new PrismaClient({});
            
                    const res = await client.user.create({
                        data: {
                            firstName,
                            lastName,
                            email,
                            password,
                            salt: "randomsalt"
                        }
                    })
                    if (res) {
                        return true;
                    }
                    return false;
                }
            }
        }
    });
    await server.start()
    return server;


}

export default createServer;

