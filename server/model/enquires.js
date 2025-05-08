const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
    category: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});
const CategoryStatSchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 }
});

const Enquiry = mongoose.model('Enquiry', EnquirySchema);
const CategoryStat = mongoose.model('CategoryStat', CategoryStatSchema);


module.exports = { Enquiry, CategoryStat };
