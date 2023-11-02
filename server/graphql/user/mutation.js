import { PrismaClient } from "@prisma/client";

export const Mutation = {
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