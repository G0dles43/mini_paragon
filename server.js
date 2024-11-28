const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

let products = []; // Przechowywanie danych w pamięci
let currentId = 1;

// Pobierz wszystkie produkty
app.get("/product", (req, res) => {
    res.json(products);
});

// Dodaj nowy produkt
app.post("/product", (req, res) => {
    const { name, price, quantity } = req.body;

    if (!name || !price || !quantity || price <= 0 || quantity <= 0) {
        return res.status(400).json({ error: "Invalid product data" });
    }

    const newProduct = { id: currentId++, name, price, quantity };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Zaktualizuj istniejący produkt
app.put("/product/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name, price, quantity } = req.body;

    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
        return res.status(404).json({ error: "Product not found" });
    }

    if (!name || !price || !quantity || price <= 0 || quantity <= 0) {
        return res.status(400).json({ error: "Invalid product data" });
    }

    products[productIndex] = { id, name, price, quantity };
    res.json(products[productIndex]);
});

// Usuń produkt
app.delete("/product/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
        return res.status(404).json({ error: "Product not found" });
    }

    products.splice(productIndex, 1);
    res.status(204).send(); // Brak zawartości
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
