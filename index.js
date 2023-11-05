const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Database variable
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'ecommerce_webapp_api'
});

// Route for creating products
app.post('/products/create', (request, response) => {
    const name = request.body.name;
    const description = request.body.description;
    const price = request.body.price;
    const quantity = request.body.quantity;
    const image = request.body.image;

    db.query('INSERT INTO products (name, description, price, quantity, image) VALUES (?, ?, ?, ?, ?)', [name, description, price, quantity, image], (error, result) => {
        if (error) console.log(error);
        else response.send('New product created.');
    });
});

app.get('/products', (request, response) => {
    db.query('SELECT * FROM products', (error, result) => {
        if (error) console.log(error);
        else response.send(result);
    });
});


app.listen(3001, () => {
    console.log('Server is running on port 3001');
});