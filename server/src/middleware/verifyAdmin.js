require('dotenv').config();

module.exports = (req, res, next) => {
  const user = req.user;

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    return res.status(403).json({ message: "Access Denied: Admins only" });
  }

  next(); // ✅ User is admin, proceed to next middleware or controller
};
