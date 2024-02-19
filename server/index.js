import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import cors from "cors";
import {
  checkIfUserEmailExists,
  checkIfUserIdExists,
  createUser,
  getUserByEmail,
} from "./modules/user.mjs";
import {
  createCategory,
  checkIfCategoryExists,
  getCategoriesByUserId,
  sumMonthlyProvision,
} from "./modules/category.mjs";
import { createSubcategory } from "./modules/subcategory.mjs";

const app = express();
const prisma = new PrismaClient();
const saltRounds = 10;
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ data: "hola" });
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await checkIfUserEmailExists(email);
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

app.post("/login", async (req, res) => {
  const { email, password: loginPassword } = req.body;
  try {
    const user = await getUserByEmail(email);
    const userExists = await checkIfUserEmailExists(email);
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

app.get("/user/:userId/category", async (req, res) => {
  const { userId } = req.params;
  try {
    const userIdExists = await checkIfUserIdExists(userId);
    if (userIdExists) {
      const categories = await getCategoriesByUserId(userId);
      res.status(200).json(categories);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/subcategory", async (req, res) => {
  const { name, categoryId, monthlyProvision, userId } = req.body;
  try {
    const newSubcategory = await createSubcategory(
      name,
      categoryId,
      monthlyProvision,
      userId
    );
    res.status(201).json(newSubcategory);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: `Invalid values submitted`, message: error });
  }
});

app.get("/category/:categoryId/provision", async (req, res) => {
  const { categoryId } = req.params;
  const response = await sumMonthlyProvision(parseInt(categoryId));
  res.send(response);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
