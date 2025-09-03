const env = require("dotenv").config();
const mysql = require("mysql2/promise");
const express = require("express")

const app = express();
app.use(express.json());

let db;

app.post("/contacts", async (req,res)=>{
    const {name,email,mobile} = req.body;
    const [results] = await db.query(`INSERT INTO contacts (name,email,mobile) VALUES (?,?,?)`,[name,email,mobile])
    if(results){
        res.status(201).send(`data row created with id - ${results.insertId}`);
    }else{
        res.status(500).send(`Internal server error`);
    }
});

mysql.createConnection({
    host:process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}).then((connection)=>{
    db=connection;
    console.log("✅ Database Connected!")


    app.listen(8080,()=>{
        console.log("Server Started! 👍")
    })
}).catch(error =>{
    console.log(error)

})