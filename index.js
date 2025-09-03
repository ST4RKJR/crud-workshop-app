const env = require("dotenv").config();
const mysql = require("mysql2/promise");
let db;
mysql.createConnection({
    host:process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}).then((connection)=>{
    db=connection;
    console.log("✅ Database Connected!")
}).catch(error =>{
    console.log(error)
})