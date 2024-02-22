import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkIfUserEmailExists(email) {
  const formattedEmail = email.toLowerCase();
  const userExists = await prisma.user.findUnique({
    where: {
      email: formattedEmail,
    },
  });
  if (userExists === null) {
    return false;
  } else {
    return true;
  }
}

async function createUser(email, hash) {
  const formattedEmail = email.toLowerCase();
  const newUser = await prisma.user.create({
    data: {
      email: formattedEmail,
      password: hash,
    },
  });
  return newUser;
}

async function getUserByEmail(email) {
  const formattedEmail = email.toLowerCase();
  const user = await prisma.user.findFirst({
    where: { email: formattedEmail },
  });
  return user;
}

async function checkIfUserIdExists(userId) {
  const parsedUserId = parseInt(userId);
  const userExists = await prisma.user.findFirst({
    where: {
      id: parsedUserId,
    },
  });
  if (userExists != null) {
    return true;
  } else {
    return false;
  }
}

async function validateUserAndSubcategory(userId, subcategoryId) {
  const response = await prisma.subcategory.findFirst({
    where: {
      userId,
      id: subcategoryId,
    },
  });
  console.log(response);
  return response;
}

export {
  checkIfUserEmailExists,
  createUser,
  getUserByEmail,
  checkIfUserIdExists,
  validateUserAndSubcategory,
};
