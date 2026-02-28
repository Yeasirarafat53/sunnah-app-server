const Hadith = require('../models/Hadith');

// সব হাদিস পাও
exports.getAllHadiths = async (req, res) => {
    try {
        const { page = 1, limit = 20, book, category } = req.query;
        const filter = {};
        if (book) filter.bookName = book;
        if (category) filter.category = category;

        const hadiths = await Hadith.find(filter)
            .populate('category', 'name')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ hadithNumber: 1 });

        const total = await Hadith.countDocuments(filter);

        res.json({
            success: true,
            data: hadiths,
            pagination: {
                total,
                page: Number(page),
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// একটি হাদিস পাও
exports.getHadithById = async (req, res) => {
    try {
        const hadith = await Hadith.findById(req.params.id).populate('category');
        if (!hadith) return res.status(404).json({ message: 'Hadith not found' });
        res.json({ success: true, data: hadith });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// নতুন হাদিস যোগ করো
exports.createHadith = async (req, res) => {
    try {
        const hadith = await Hadith.create(req.body);
        res.status(201).json({ success: true, data: hadith });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// হাদিস আপডেট করো
exports.updateHadith = async (req, res) => {
    try {
        const hadith = await Hadith.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, data: hadith });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// হাদিস ডিলিট করো
exports.deleteHadith = async (req, res) => {
    try {
        await Hadith.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Hadith deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// হাদিস সার্চ করো
exports.searchHadiths = async (req, res) => {
    try {
        const { q } = req.query;
        const hadiths = await Hadith.find({
            $or: [
                { bangla: { $regex: q, $options: 'i' } },
                { english: { $regex: q, $options: 'i' } },
                { tags: { $in: [q] } },
            ],
        }).limit(20);
        res.json({ success: true, data: hadiths });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};