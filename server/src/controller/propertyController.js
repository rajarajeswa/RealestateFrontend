const formidable = require('formidable');
const path = require('path');
const Property = require('../models/Property');
const User = require("../models/user");

exports.AddProperty = (req, res) => {
  const form = new formidable.IncomingForm({
    multiples: true,
    uploadDir: path.join(__dirname, '../uploads'),
    keepExtensions: true
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("❌ Form parse error:", err);
      return res.status(400).send("Error parsing form data");
    }

    // Clean fields
    const cleanedFields = {};
    for (let key in fields) {
      const cleanKey = key.trim();
      const value = Array.isArray(fields[key]) ? fields[key][0].trim() : fields[key].trim();
      cleanedFields[cleanKey] = value;
    }

    console.log("🧼 Cleaned fields:", cleanedFields);
    console.log("📁 Uploaded files:", files);


    try {
      // Handle uploaded image files
      let imageFilenames = [];
      if (Array.isArray(files.propertyImages)) {
        imageFilenames = files.propertyImages.map(file => file.newFilename);
      } else if (files.propertyImages) {
        imageFilenames = [files.propertyImages.newFilename];
      } else {
        imageFilenames = ["noimage.jpg"];
      }

      const Property = require('../models/Property');

      const newProperty = await Property.create({
        propertyTitle: cleanedFields.propertyTitle || null,
        propertyType: cleanedFields.propertyType || null,
        propertyStatus: cleanedFields.propertyStatus || null,
        propertyPrice: parseInt(cleanedFields.propertyPrice) || 0,
        bedrooms: parseInt(cleanedFields.bedrooms) || 0,
        bathrooms: parseInt(cleanedFields.bathrooms) || 0,
        area: parseInt(cleanedFields.area) || 0,
        propertyLength: parseInt(cleanedFields.propertyLength) || 0,
        propertyBreadth: parseInt(cleanedFields.propertyBreadth) || 0,
        propertyAddress: cleanedFields.propertyAddress || null,
        propertyCity: cleanedFields.propertyCity || null,
        propertyState: cleanedFields.propertyState || null,
        pincode: cleanedFields.pincode || null,
        landmark: cleanedFields.landmark || null,
        facing: cleanedFields.facing || null,
        roadFacility: cleanedFields.roadFacility || null,
        roadType: cleanedFields.roadType || null,
        publicTransport: cleanedFields.publicTransport || null,
        waterSupply: cleanedFields.waterSupply || null,
        furnishing: cleanedFields.furnishing || null,
        propertyAge: parseInt(cleanedFields.propertyAge) || 0,
        propertyDescription: cleanedFields.propertyDescription || null,
        propertyImages: imageFilenames.join(','),
        propertyAgent: cleanedFields.propertyAgent || null,
        propertyDate: cleanedFields.propertyDate || new Date()
      });

      console.log("✅ Property created:", newProperty.toJSON());
      res.status(200).send("Property added successfully");
    } catch (error) {
      console.error("❌ Sequelize insertion error:", error);
      res.status(500).send("Error inserting into database");
    }
  });
};
exports.ViewProperty = async (req, res) => {
  try {
    const property = await Property.findAll();
    res.status(200).json(property); // ✅ JSON response
  } catch (err) {
    console.error("❌ Error fetching properties:", err);
    // ❌ Wrong: res.status(500).send("Database error while fetching properties");
    // ✅ Correct:
    res.status(500).json({ error: "Database error while fetching properties" });
  }
};


exports.ViewUser = async (req, res) => {
  try {
    const user = await User.findAll();
    res.status(200).json(user); // ✅ JSON response
  } catch (err) {
    console.error("❌ Error fetching properties:", err);
    // ❌ Wrong: res.status(500).send("Database error while fetching properties");
    // ✅ Correct:
    res.status(500).json({ error: "Database error while fetching properties" });
  }
};

