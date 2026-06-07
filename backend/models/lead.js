import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Phone_Number: {
        type: String,
        required: true
    },
    Company_Name: {
        type: String,
        required: true
    },
    Lead_Status: {
        type: String,
        required: true,
        enum: ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'],
        default: 'New'
    },
    Notes: {
        type: String,
        required: true
    },
    Created_Date: {
        type: Date,
        default: Date.now
    }
});

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;