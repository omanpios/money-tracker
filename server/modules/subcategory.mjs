import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createSubcategory(name, categoryId, monthlyProvision, userId) {
  const data = { name, categoryId, monthlyProvision, userId };
  const newSubcategory = await prisma.subcategory.create({ data: { ...data } });
  return newSubcategory;
}

export { createSubcategory };
