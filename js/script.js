
let cart = JSON.parse(localStorage.getItem("cart")) || [];


function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function displayCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    if (!cartItemsContainer) return;  

    cartItemsContainer.innerHTML = ""; 

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<tr><td colspan='4'>El carrito está vacío</td></tr>";
        totalPriceElement.innerText = "Total: $0.00";
        return;
    }

    let total = 0;
    cart.forEach((product, index) => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><img src="${product.image}" width="50"></td>
            <td><button class="remove-item" data-index="${index}">Eliminar</button></td>
        `;

        cartItemsContainer.appendChild(row);
        total += parseFloat(product.price.replace("$", ""));
    });

    totalPriceElement.innerText = `Total: $${total.toFixed(2)}`;
}

function addToCart(event) {
    const productElement = event.target.closest(".product");
    const productName = productElement.querySelector(".product-name").innerText;
    const productPrice = productElement.querySelector(".product-price").innerText;
    const productImage = productElement.querySelector("img").src;

    const product = {
        name: productName,
        price: productPrice,
        image: productImage
    };

    cart.push(product);
    updateCart();
    alert(`${productName} agregado al carrito`);
}

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item")) {
        const index = event.target.getAttribute("data-index");
        cart.splice(index, 1);
        updateCart();
        displayCart();
    }
});

document.getElementById("clear-cart")?.addEventListener("click", () => {
    cart = [];
    updateCart();
    displayCart();
});

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.innerText = cart.length;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".add-to-cart");
    buttons.forEach(button => {
        button.addEventListener("click", addToCart);
    });
    displayCart();
    updateCartCount();
});
