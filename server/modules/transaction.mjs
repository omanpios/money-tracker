import { PrismaClient } from "@prisma/client";

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
  });
  return transactions;
}

async function getTransactionsBySubcategoryId(subcategoryId) {
  const transactions = await prisma.transaction.findMany({
    where: { subcategoryId: subcategoryId },
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

export {
  createTransaction,
  getTransactionsByUserId,
  getTransactionsBySubcategoryId,
  deleteTransaction,
};
