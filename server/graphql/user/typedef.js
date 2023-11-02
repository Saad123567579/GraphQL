export const typeDef = `
type Mutation {
    createUser(
        firstName: String
        lastName: String
        email: String
        password: String
    ): Boolean
    }
`