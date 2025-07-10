const formidable = require('formidable');
const Inquiry = require("../models/Inquiry");

// Handle POST /buy - Submit Inquiry
exports.Inquiries = (req, res) => {
  const form = new formidable.IncomingForm({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("❌ Form parse error:", err);
      return res.status(400).send("Error parsing form data");
    }

    console.log("✅ Fields:", fields);

    try {
      const newInquiry = await Inquiry.create({
        name: fields.name[0],
        email: fields.email[0],
        phone: fields.phone[0],
        buy: fields.buy[0],
        message: fields.message[0]
      });

      console.log("✅ Inquiry created:", newInquiry.toJSON());
      return res.status(200).send("Inquiry added successfully");

    } catch (error) {
      console.error("❌ Sequelize error:", error);
      return res.status(500).send("Database error");
    }
  });
};

// Handle GET /inquiries - View all inquiries
exports.ViewInquiries = async (req, res) => {
  try {
    const properties = await Inquiry.findAll();
    res.status(200).json(properties); // Send data as JSON
  } catch (err) {
    console.error('❌ Sequelize Fetch Error:', err);
    res.status(500).send("Database error during fetch");
  }
};
