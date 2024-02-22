import { PrismaClient } from "@prisma/client";
import { getSubcategoriesByUserId } from "./subcategory.mjs";

const prisma = new PrismaClient();

async function createTransaction({
  description,
  amount,
  subcategoryId,
  userId,
  date,
}) {
  const transaction = await prisma.transaction.create({
    data: {
      description: description,
      amount: amount,
      subcategoryId: subcategoryId,
      userId: userId,
      date: date,
    },
  });
  return transaction;
}

async function getTransactionsByUserId(userId) {
  const transactions = await prisma.transaction.findMany({
    where: { userId: userId },
    include: { subcategory: { select: { name: true } } },
    orderBy: { date: "desc" },
  });
  return transactions;
}

async function getTransactionsBySubcategoryId(subcategoryId) {
  const transactions = await prisma.transaction.findMany({
    where: { subcategoryId: subcategoryId },
    include: { subcategory: { select: { name: true } } },
    orderBy: { date: "desc" },
  });
  return transactions;
}

async function deleteTransaction(transactionId) {
  const deleted = await prisma.transaction.delete({
    where: {
      id: transactionId,
    },
  });
  return deleted;
}

async function splitIncome(userId, incomeAmount, description, date) {
  try {
    const response = await getSubcategoriesByUserId(userId);
    const subcategories = response;
    const totalProvision = subcategories.reduce((acc, subc) => {
      return acc + subc.monthlyProvision;
    }, 0);
    subcategories.forEach((subcategory) => {
      const proportion = subcategory.monthlyProvision / totalProvision;
      const amount = proportion * incomeAmount;
      try {
        createTransaction({
          description: description,
          amount: parseFloat(amount.toFixed(2)),
          subcategoryId: subcategory.id,
          userId: userId,
          date: date,
        });
      } catch (error) {
        return error;
      }
    });
  } catch (error) {
    return error;
  }
  return true;
}

export {
  createTransaction,
  getTransactionsByUserId,
  getTransactionsBySubcategoryId,
  deleteTransaction,
  splitIncome,
};
