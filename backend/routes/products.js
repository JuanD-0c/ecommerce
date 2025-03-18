const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Obtener todos los productos
router.get("/", async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener productos" });
    }
});

// Crear un nuevo producto (solo para admin)
router.post("/", async (req, res) => {
    try {
        const { name, price, image } = req.body;
        const newProduct = await Product.create({ name, price, image });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el producto" });
    }
});

module.exports = router;
