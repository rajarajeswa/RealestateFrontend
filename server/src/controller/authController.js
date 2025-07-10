const formidable = require('formidable');
const User = require('../models/user');

// ✅ Register User
exports.RegisterUser = async (req, res) => {
  const form = new formidable.IncomingForm({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("❌ Form parse error:", err);
      return res.status(400).send("Error parsing form data");
    }

    console.log("✅ Fields:", fields);
    console.log("📁 Files:", files);

    try {
      const newUser = await User.create({
         username: fields.name[0]?.trim(),
          email: fields.email[0]?.trim(),
          password: fields.password[0]?.trim(),
          contact: parseInt(fields.contact[0]),
          address: fields.address[0]?.trim(),
      });

      console.log("User:", newUser.toJSON());
      res.status(200).send("User added successfully");
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        console.error("❌ Duplicate email detected.");
        res.status(409).send("Email already exists");
      } else {
        console.error("❌ Sequelize Insert Error:", err);
        res.status(400).send("Error inserting in database");
      }
    }
  });
};

// ✅ Login User
exports.LoginUser = async (req, res) => {
  const form = new formidable.IncomingForm({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("❌ Form parse error:", err);
      return res.status(400).send("Error parsing form data");
    }

    const { email, password } = fields;

    try {
      const user = await User.findOne({ where: { email, password } });

      if (user) {
        const jwt = require('jsonwebtoken');
        const payload = { id: user.id, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        // ✅ Send token to frontend
        res.status(200).json({ message: 'Login successful', token });
      } else {
        res.status(401).send("Invalid email or password");
      }
    } catch (err) {
      console.error("❌ Sequelize Login Error:", err);
      res.status(500).send("Database error during login");
    }
  });
};
