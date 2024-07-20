const mongoose = require('mongoose');
//Mongoose Schema for Mongodb
const UserSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dateOfRegistration: { type: Date, default: Date.now },
    dob: { type: Date, required: true },
    monthlySalary: { type: Number, required: true },
    status: { type: String, default: 'Pending' },
    password: { type: String, required: true },
    purchasePower: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', UserSchema);
