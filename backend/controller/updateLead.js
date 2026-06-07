import Lead from '../models/Lead.js';

const updateLead = async (req, res) => {
    try {
        const leadId = req.params.id;   
        const lead = await Lead.findById(leadId);
        if (!lead) {
            return res.status(404).json({ error: 'Lead not found' });
        }
        const { name, email, phone, company, status, notes } = req.body;
        lead.Name = name || lead.Name;
        lead.Email = email || lead.Email;
        lead.Phone_Number = phone || lead.Phone_Number;
        lead.Company_Name = company || lead.Company_Name;
        lead.Lead_Status = status || lead.Lead_Status;
        lead.Notes = notes || lead.Notes;
        lead.Created_Date = Date.now();
        await lead.save();
        res.status(200).json(lead);
    } catch (error) {
        console.error('Error updating lead:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default updateLead;