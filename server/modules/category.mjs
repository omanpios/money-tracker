import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createCategory(name, userId) {
  const formattedName = name.toLowerCase();
  const newCategory = await prisma.category.create({
    data: {
      name: formattedName,
      userId,
    },
  });
  return newCategory;
}

async function checkIfCategoryExists(name, userId) {
  const formattedName = name.toLowerCase();
  const categoryExists = await prisma.category.findUnique({
    where: {
      UniqueCategoryNamePerUser: { name: formattedName, userId },
    },
  });
  if (categoryExists === null) {
    return false;
  } else {
    return true;
  }
}

async function getCategoriesByUserId(userId = null) {
  const parsedUserId = parseInt(userId);
  const categories = await prisma.category.findMany({
    where: { userId: parsedUserId },
  });
  return categories;
}

export { createCategory, checkIfCategoryExists, getCategoriesByUserId };
