import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createSubcategory(name, categoryId, monthlyProvision, userId) {
  const data = { name, categoryId, monthlyProvision, userId };
  const newSubcategory = await prisma.subcategory.create({ data: { ...data } });
  return newSubcategory;
}

async function getSubcategoriesByCategoryId(categoryId) {
  const subcategories = await prisma.subcategory.findMany({
    where: { categoryId: categoryId },
  });
  return subcategories;
}

async function getSubcategoriesByUserId(userId) {
  const subcategories = await prisma.subcategory.findMany({
    where: { userId: userId },
  });
  return subcategories;
}

export {
  createSubcategory,
  getSubcategoriesByCategoryId,
  getSubcategoriesByUserId,
};
