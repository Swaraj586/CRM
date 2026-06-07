import Lead from '../models/Lead.js';

const delLead = async (req, res) => {
    try {
        const leadId = req.params.id;   
        const lead = await Lead.findById(leadId);
        if (!lead) {
            return res.status(404).json({ error: 'Lead not found' });
        }
        await Lead.findByIdAndDelete(leadId);
        res.status(200).json({ message: 'Lead deleted successfully' });
    } catch (error) {
        console.error('Error deleting lead:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default delLead;