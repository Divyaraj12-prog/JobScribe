const mongoose = require('mongoose');
const appModel = require('../models/applicationModel');

async function addApplicationController(req, res) {
    try {
        const { companyName, jobTitle, jobLink, status, resume, notes, interviewDate, priority } = req.body;

        if (!companyName || !jobTitle || !jobLink) {
            return res.status(400).json({ message: 'Company name, job title, and job link are required' });
        }

        const newApplication = await appModel.create({
            user: req.user.userId,
            companyName,
            jobTitle,
            jobLink,
            status,
            resume,
            notes,
            interviewDate,
            priority
        });
        res.status(201).json({
            message: 'Application added successfully',
            application: newApplication
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error adding application',
            error: error.message
        });
    }
}

async function getAllApplicationsController(req, res) {
    try {
        const userId = req.user.userId;

        const applications = await appModel.find({
            user: userId
        }).sort({ createdAt: -1 });

        if (!applications || applications.length === 0) {
            return res.status(404).json({ message: 'No applications found for this user' });
        }

        res.status(200).json({
            message: 'Applications retrieved successfully',
            applications
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving applications',
            error: error.message
        });
    }
}

async function getApplicationByIdController(req, res) {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid application ID' });
        }
        const application = await appModel.findOne({
            _id: id,
            user: req.user.userId
        });

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json({
            message: 'Application retrieved successfully',
            application
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving application',
            error: error.message
        });
    }
}

async function updateApplicationController(req, res) {
    try {
        const { id } = req.params;
        const { companyName, jobTitle, jobLink, status, resume, notes, interviewDate, priority } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid application ID' });
        }

        const updatedApplication = await appModel.findOneAndUpdate({
            _id: id,
            user: req.user.userId
        },
            req.body,
            {
                new: true,
                runValidators: true
            });

        if (!updatedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json({
            message: 'Application updated successfully',
            application: updatedApplication
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating application',
            error: error.message
        });
    }
}

async function deleteApplicationController(req, res) {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid application ID' });
        }
        const deletedApplication = await appModel.findOneAndDelete({
            _id: id,
            user: req.user.userId
        });
        if (!deletedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json({
            message: 'Application deleted successfully',
            application: deletedApplication
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting application',
            error: error.message
        });
    }
}

module.exports = {
    addApplicationController,
    getAllApplicationsController,
    getApplicationByIdController,
    updateApplicationController,
    deleteApplicationController
}
