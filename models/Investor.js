const mongoose = require('mongoose');
const InvestorSchema = new mongoose.Schema({
    name: String,
    email: String,
    interests: String,
    registeredAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Investor', InvestorSchema);