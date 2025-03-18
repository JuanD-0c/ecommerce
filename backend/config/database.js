const { Sequelize } = require("sequelize");
require("dotenv").config();

// Configuración de Sequelize para conectar con MySQL
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false,
    }
);

// Verificar la conexión a la base de datos
sequelize.authenticate()
    .then(() => console.log("✅ Conectado a la base de datos MySQL"))
    .catch(error => console.error("❌ Error al conectar con MySQL:", error));

module.exports = sequelize;
