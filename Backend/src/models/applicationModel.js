const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    companyName:{
        type: String,
        required: true
    },
    jobTitle:{
        type: String,
        required: true
    },
    jobLink:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['Applied', 'Interview', 'Offer', 'Saved', 'Rejected'],
        default: 'Saved'
    },
    resume:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'resume',
    },
    notes:{
        type: String,
    },
    appliedDate:{
        type: Date,
        default: Date.now
    },
    interviewDate:{
        type: Date,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium'
    }
}, { timestamps: true });

const appModel = mongoose.model('Application', applicationSchema);
module.exports = appModel;