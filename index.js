const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { default: PRODUCT_ROUTES } = require("./routes/productRoutes");
const { default: db } = require("./config/mysql");

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    safeFileNames: true,
    preserveExtension: true,
  })
);

// Route for signing in as admin
app.post("/login", (request, response) => {
  const username = request.body.username;
  const password = request.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (error, result) => {
      if (error) console.log(error);
      else response.send(result);
    }
  );
});

app.use("/products", PRODUCT_ROUTES);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
