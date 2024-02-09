import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const app = express();
const prisma = new PrismaClient();
const saltRounds = 10;
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ data: "hola" });
});

async function verifyIfUserExists(email) {
  const formattedEmail = email.toLowerCase();
  const checkResult = await prisma.user.findUnique({
    where: {
      email: formattedEmail,
    },
  });
  return checkResult;
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
    const checkResult = await verifyIfUserExists(email);
    if (checkResult != null) {
      res.status(400).send("You already exist in DB");
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
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password: loginPassword } = req.body;
  try {
    const user = await verifyIfUserExists(email);
    if (user != null) {
      const { email, password: storedPassword } = user;
      bcrypt.compare(loginPassword, storedPassword, (error, result) => {
        if (error) {
          console.log(error);
        } else {
          if (result) {
            res.sendStatus(200);
          } else {
            res.sendStatus(403);
          }
        }
      });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
