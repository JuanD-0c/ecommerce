const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secreto_seguro";

// Middleware para verificar token JWT
function authenticateToken(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Acceso denegado" });

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ error: "Token inválido" });
    }
}

module.exports = authenticateToken;
