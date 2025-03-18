const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const authenticateToken = require("../middleware/authMiddleware");

// Obtener productos en el carrito (requiere autenticación)
router.get("/", authenticateToken, async (req, res) => {
    try {
        const cartItems = await Cart.findAll({ where: { userId: req.user.userId }, include: Product });
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el carrito" });
    }
});

// Agregar producto al carrito (requiere autenticación)
router.post("/", authenticateToken, async (req, res) => {
    try {
        const { productId } = req.body;
        const newCartItem = await Cart.create({ userId: req.user.userId, productId });
        res.status(201).json(newCartItem);
    } catch (error) {
        res.status(500).json({ error: "Error al agregar al carrito" });
    }
});

module.exports = router;
