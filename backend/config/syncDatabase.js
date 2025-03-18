const sequelize = require("./database");
const User = require("../models/User");
const Product = require("../models/Product");
const Cart = require("../models/Cart");

(async () => {
    try {
        await sequelize.sync({ force: true }); // Forzar la sincronización (elimina y recrea las tablas)
        console.log("✅ Base de datos sincronizada correctamente.");
        process.exit();
    } catch (error) {
        console.error("❌ Error al sincronizar la base de datos:", error);
        process.exit(1);
    }
})();
