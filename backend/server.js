require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const path = require("path");

const app = express(); // Inicializar la aplicación Express

// Seguridad
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "../")));

// Rutas de la API
app.use("/api/products", require("./routes/products"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/users", require("./routes/users"));

// Puerto del servidor
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
