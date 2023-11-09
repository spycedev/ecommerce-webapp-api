import express from "express";
import db from "../config/mysql";

const PRODUCT_ROUTES = express.Router();

// Route for getting all products
PRODUCT_ROUTES.get("/", (request, response) => {
  db.query("SELECT * FROM products", (error, result) => {
    if (error) console.log(error);
    else response.send(result);
  });
});

// Route for getting a product
PRODUCT_ROUTES.get("/:id", (request, response) => {
  const id = request.params.id;
  console.log(id);
  db.query("SELECT * FROM products WHERE id = ?", id, (error, result) => {
    console.log(result);
    if (error) console.log(error);
    else response.send(result);
  });
});

// Route for creating a product
PRODUCT_ROUTES.post("/create", (request, response) => {
  const name = request.body.name;
  const description = request.body.description;
  const price = request.body.price;
  const quantity = request.body.quantity;
  const image = request.body.image;
  let imageName = "";

  if (!image) imageName = "product-placeholder.png";
  else {
    imageName = image.name;
    // Code for file upload here
  }

  db.query(
    "INSERT INTO products (name, description, price, quantity, image) VALUES (?, ?, ?, ?, ?)",
    [name, description, price, quantity, imageName],
    (error, result) => {
      if (error) console.log(error);
      else response.send("New product created.");
    }
  );
});

// Route for updating a product
PRODUCT_ROUTES.put("/:id/update", (request, response) => {
  const id = request.params.id;
  const name = request.body.name;
  const description = request.body.description;
  const price = request.body.price;
  const quantity = request.body.quantity;
  const image = request.body.image;

  db.query(
    "UPDATE products SET name = ?, description = ?, price = ?, quantity = ?, image = ? WHERE id = ?",
    [name, description, price, quantity, image, id],
    (error, result) => {
      if (error) console.log(error);
      else response.send("Product has been updated.");
    }
  );
});

// Route for deleting a product
PRODUCT_ROUTES.delete("/:id/delete", (request, response) => {
  const id = request.params.id;

  console.log(id);
  db.query("DELETE FROM products WHERE id = ?", id, (error, result) => {
    if (error) console.log(error);
    else response.send(result);
  });
});

export default PRODUCT_ROUTES;
