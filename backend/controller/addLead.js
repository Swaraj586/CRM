import Lead from "../models/Lead.js";

const addLead = async (req, res) => {
    try {
        const { name, email, phone, company, status, notes } = req.body;
        const newLead = new Lead({
            Name: name,
            Email: email,
            Phone_Number: phone,
            Company_Name: company,
            Lead_Status: status,
            Notes: notes
        });
        await newLead.save();
        res.status(201).json(newLead);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export default addLead;