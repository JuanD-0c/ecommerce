
function displayCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    cartItemsContainer.innerHTML = ""; // Limpiar el contenido antes de mostrarlo

    let total = 0;
    cart.forEach((product, index) => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><button class="remove-item" data-index="${index}">Eliminar</button></td>
        `;

        cartItemsContainer.appendChild(row);
        total += parseFloat(product.price.replace("$", ""));
    });

    totalPriceElement.innerText = `Total: $${total.toFixed(2)}`;
}
// Función para eliminar productos del carrito
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item")) {
        const index = event.target.getAttribute("data-index");
        cart.splice(index, 1);
        updateCart();
        displayCart();
    }
});
// Función para vaciar el carrito
document.getElementById("clear-cart").addEventListener("click", () => {
    cart = [];
    updateCart();
    displayCart();
});
// Mostrar el carrito cuando la página del carrito se carga
document.addEventListener("DOMContentLoaded", displayCart);
