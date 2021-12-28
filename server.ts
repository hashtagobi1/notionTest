import { Request, Response, NextFunction } from "express";
require("dotenv").config();

const express = require("express");
const app = express();
const notion = require("./notion");

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.post("/create-suggestion", async (req: Request, res: Response) => {
  const { title, description, discord_name } = req.body;

  await notion.createSuggestion({
    title,
    description,
    discord_name,
  });

  res.redirect("/");
  // console.log(req.body);
  // const { title, description, discord_name };
});

app.get("/", (req: Request, res: Response) => {
  res.render("index");
  // console.log(notion);
});
app.listen(process.env.PORT);
