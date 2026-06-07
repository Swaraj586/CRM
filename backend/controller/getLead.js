import Lead from "../models/Lead.js";

const getLead = async (req, res) => {
    try {
        const lead = await Lead.find({});
        
        res.json(lead);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export default getLead;