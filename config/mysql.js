// Database variable
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "ecommerce_webapp_api",
});

export default db;
