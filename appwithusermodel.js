const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    // name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true }
});

// Export the user model
module.exports = mongoose.model("User", userSchema);
