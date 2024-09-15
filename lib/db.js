const { PrismaClient } = require("@prisma/client");

const prismaClientSingleton = () => {
    return new PrismaClient();
};

const prisma =gobal.prismaGlobal || prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
    global.prismaGlobal = prisma;
}

module.exports = prisma;