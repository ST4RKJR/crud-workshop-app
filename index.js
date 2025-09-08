const env = require("dotenv").config();
const mysql = require("mysql2/promise");
const express = require("express");
const cors = require("cors");
const { IoEllipseSharp } = require("react-icons/io5");

const app = express();
app.use(express.json());
app.use(cors());

let db;

app.post("/contacts", async (req, res) => {
  const { name, email, mobile } = req.body;
  const [results] = await db.query(
    `INSERT INTO contacts (name,email,mobile) VALUES (?,?,?)`,
    [name, email, mobile]
  );
  if (results) {
    res.status(201).send(`data row created with id - ${results.insertId}`);
  } else {
    res.status(500).send(`Internal server error`);
  }
});

//get all api
app.get("/contacts", async (req, res) => {
  const [results] = await db.query(`SELECT * FROM contacts`);
  if (results) {
    res.status(200).json(results);
  } else {
    res.send(400).send("data not found");
  }
});

//get by id
app.get("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  await db.query(`SELECT * FROM contacts WHERE id=?`, [id]);
  if (results) {
    res.status(200).json(results);
  } else {
    res.status(400).send("data not found");
  }
});

//delete by id
app.delete("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  const [results] = await db.query(`DELETE FROM contacts WHERE id=?`, [id]);
  if (results) {
    res.status(200).send("resource deleted");
  } else {
    res.status(500).send("internal server error");
  }
});

//put by id
app.put("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  const [results] = await db.query(
    `UPDATE contacts set name=? ,email=?, mobile=? WHERE id=? `,
    [name, email, mobile, id]
  );
  if (results){
    res.status(200).send("resource modified")
  }else{
    res.status(500).send("internal server error")
  }
});

mysql
  .createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  .then((connection) => {
    db = connection;
    console.log("✅ Database Connected!");

    app.listen(8080, () => {
      console.log("Server Started! 👍");
    });
  })
  .catch((error) => {
    console.log(error);
  });
