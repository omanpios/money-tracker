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

app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkResult = await prisma.user.findFirst({
      where: { email: email },
    });
    if (checkResult != null) {
      res.status(400).send("You already exist in DB");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const prismaCreate = await prisma.user.create({
            data: {
              email: email,
              password: hash,
            },
          });
          console.log(prismaCreate);
          res.status(201).json({ email: email });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
