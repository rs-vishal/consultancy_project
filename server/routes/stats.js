const express = require('express');
const { MongoClient } = require('mongodb');
const router = express.Router();
const { Enquiry, CategoryStat } = require('../model/enquires');

// MongoDB Connection




router.post('/post_no_of_enquiry', async (req, res) => {
    try {
        const { category, email, mobile } = req.body;

        if (!category || !email || !mobile) {
            return res.status(400).json({ error: "Category, email and mobile are required" });
        }

        const enquiryData = new Enquiry({ category, email, mobile });
        await enquiryData.save();

        await CategoryStat.findOneAndUpdate(
            { category },
            { $inc: { count: 1 } },
            { upsert: true, new: true }
        );

        return res.status(200).json({ message: "Enquiry updated" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

router.get('/get_no_of_enquiry', async (req, res) => {
    try {
        // Use CategoryStat model and .lean() for plain JavaScript objects
        // Also, the projection for excluding _id is just { _id: 0 }
        const stats = await CategoryStat.find({}, { _id: 0 }).lean();
        return res.status(200).json(stats);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;


