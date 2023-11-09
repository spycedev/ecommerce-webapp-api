import mysql from "mysql2";
// Database variable

// this creates an async connection to the dB
const db = mysql
  .createPool({
    user: "root",
    host: "localhost",
    password: "",
    database: "ecommerce_webapp_api",
  })
  .promise();

// const db = mysql.create({
//   user: "root",
//   host: "localhost",
//   password: "",
//   database: "ecommerce_webapp_api",
// });

export default db;
