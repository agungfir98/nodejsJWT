const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

const post = [
  {
    name: "gnuga",
    tittle: "post 1",
  },
  {
    name: "agnf",
    tittle: "post 2",
  },
];

app.get("/post", authorization, (req, res) => {
  res.status(200).send(post.filter((post) => post.name === req.user.name));
});

app.post("/login", (req, res) => {
  const username = req.body.name;
  //   const password = req.body.password;
  const user = { name: username };

  const accessToken = jwt.sign(user, process.env.SECRET_TOKEN);
  res.json({ accessToken: accessToken });
});

function authorization(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(PORT, console.log("APP running on PORT " + PORT));
