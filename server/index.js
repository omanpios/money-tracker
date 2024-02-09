import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const app = express();
const prisma = new PrismaClient();
const saltRounds = 10;
const port = 8080;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ data: "hola" });
});

async function checkIfUserExists(email) {
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

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await checkIfUserExists(email);
    if (userExists) {
      res
        .status(400)
        .json({ error: `email address '${email}' is already registered` });
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const newUser = await createUser(email, hash);
          res.status(201).json({
            id: newUser.id,
            email: newUser.email,
          });
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
});

async function getUserByEmail(email) {
  const formattedEmail = email.toLowerCase();
  const user = await prisma.user.findFirst({
    where: { email: formattedEmail },
  });
  return user;
}

app.post("/login", async (req, res) => {
  const { email, password: loginPassword } = req.body;
  try {
    const user = await getUserByEmail(email);
    const userExists = await checkIfUserExists(email);
    if (userExists) {
      const { email, password: storedPassword } = user;
      bcrypt.compare(loginPassword, storedPassword, (error, result) => {
        if (error) {
          console.error(error);
        } else {
          if (result) {
            res.sendStatus(200);
          } else {
            res.sendStatus(401);
          }
        }
      });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
  }
});

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

app.post("/category", async (req, res) => {
  const { name, userId } = req.body;
  try {
    const categoryExists = await checkIfCategoryExists(name, userId);
    if (!categoryExists) {
      const newCategory = await createCategory(name, userId);
      res.status(201).json(newCategory);
    } else {
      res.status(400).json({ error: `Category '${name}' already exists` });
    }
  } catch (error) {
    res.status(500).json({ error: error });
    console.error(error);
  }
});

async function getCategories(userId = null) {
  const parsedUserId = parseInt(userId);
  const categories = await prisma.category.findMany({
    where: { userId: parsedUserId },
  });
  return categories;
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

app.get("/category", async (req, res) => {
  const { userId } = req.query;
  try {
    const userIdExists = await checkIfUserIdExists(userId);
    if (userIdExists) {
      const categories = await getCategories(userId);
      res.status(200).json(categories);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
