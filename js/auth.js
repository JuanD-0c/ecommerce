const API_URL = "http://localhost:5000/api";

// Registrar usuario
async function registerUser() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${API_URL}/users/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();
        alert(data.message);
        if (response.ok) {
            window.location.href = "login.html";
        }
    } catch (error) {
        console.error("Error al registrar usuario:", error);
    }
}

// Iniciar sesión
async function loginUser() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            alert("Inicio de sesión exitoso");
            window.location.href = "index.html";
        } else {
            alert("Credenciales incorrectas");
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
    }
}

// Cerrar sesión
function logoutUser() {
    localStorage.removeItem("token");
    alert("Sesión cerrada");
    window.location.href = "login.html";
}

// Verificar si el usuario está autenticado
function checkAuth() {
    const token = localStorage.getItem("token");
    if (!token) {
        document.getElementById("auth-buttons").innerHTML = '<a href="login.html">Iniciar Sesión</a> | <a href="register.html">Registrarse</a>';
    } else {
        document.getElementById("auth-buttons").innerHTML = '<button onclick="logoutUser()">Cerrar Sesión</button>';
    }
}

document.addEventListener("DOMContentLoaded", checkAuth);
