export { Prisma } from "./generated/prisma/client.js"; // exports instance of prisma
export * from "./generated/prisma/client.js"; // exports generated types from prisma
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
export default prisma;

process.on("SIGINT", async () => {
  await prisma.$disconnect();
});
