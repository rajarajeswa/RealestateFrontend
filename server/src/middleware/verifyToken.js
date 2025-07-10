require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // 🔐 Check if the Authorization header is present and formatted correctly
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }

  // 🧪 Extract the token
  const token = authHeader.split(" ")[1];

  try {
    // ✅ Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🧠 Optional: Attach user info to request for downstream use
    req.user = decoded;

    next(); // 🚀 Proceed to the next middleware or route handler
  } catch (err) {
    console.error("❌ Invalid token:", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
