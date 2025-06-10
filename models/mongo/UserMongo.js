const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { _id: false, timestamps: true });
module.exports = mongoose.model('User', UserSchema);