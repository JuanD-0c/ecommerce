const API_URL = "http://localhost:5000/api";

// Obtener productos desde la API y mostrarlos en la tienda
async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
}

// Mostrar productos en la tienda
function displayProducts(products) {
    const productContainer = document.getElementById("product-list");
    if (!productContainer) return;
    
    productContainer.innerHTML = "";

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
        `;
        productContainer.appendChild(productElement);
    });
}

// Obtener el carrito del usuario autenticado
async function fetchCart() {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/cart`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        const cartItems = await response.json();
        displayCart(cartItems);
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
    }
}

// Mostrar carrito en la página
function displayCart(cartItems) {
    const cartContainer = document.getElementById("cart-items");
    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    cartItems.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.product.name}</td>
            <td>$${item.product.price}</td>
            <td><img src="${item.product.image}" width="50"></td>
            <td><button onclick="removeFromCart(${item.id})">Eliminar</button></td>
        `;
        cartContainer.appendChild(row);
    });
}

// Agregar producto al carrito
async function addToCart(productId) {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_URL}/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ productId })
        });

        const data = await response.json();
        alert("Producto agregado al carrito");
        fetchCart();
    } catch (error) {
        console.error("Error al agregar producto al carrito:", error);
    }
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
    fetchCart();
});
