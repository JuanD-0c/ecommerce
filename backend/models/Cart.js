const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Product = require("./Product");

const Cart = sequelize.define("Cart", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: "id" } },
    productId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Product, key: "id" } }
}, { timestamps: true });

module.exports = Cart;
