const assert = require("assert");

// Funciones a probar
const cart = [];

function addToCart(product) {
    cart.push(product);
}

function removeFromCart(index) {
    cart.splice(index, 1);
}

// Grupo de pruebas
describe("Carrito de Compras", function () {

    it("Debería agregar un producto al carrito", function () {
        const product = { name: "Balón Oficial", price: "$30.00" };
        addToCart(product);
        assert.strictEqual(cart.length, 1);
        assert.deepStrictEqual(cart[0], product);
    });

    it("Debería eliminar un producto del carrito", function () {
        removeFromCart(0);
        assert.strictEqual(cart.length, 0);
    });

});
