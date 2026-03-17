const resumeModel = require('../models/resumeModel');
const mongoose = require('mongoose');

async function uploadResumeController(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const { title } = req.body;
        const newResume = await resumeModel.create({
            user: req.user.userId,
            title,
            fileUrl: req.file.path,
            originalName: req.file.originalname
        });

        res.status(201).json({
            message: 'Resume uploaded successfully',
            resume: newResume
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error uploading resume',
            error: error.message
        });
    }
}

async function getResumesController(req, res) {
    try {
        const userId = req.user.userId;

        const resumes = await resumeModel.find({
            user: userId
        }).sort({ createdAt: -1 });

        if (!resumes || resumes.length === 0) {
            return res.status(404).json({ message: 'No resumes found for this user' });
        }

        res.status(200).json({
            message: 'Resumes retrieved successfully',
            resumes
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving resumes',
            error: error.message
        });
    }
}

async function getResumeByIdController(req, res) {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Resume ID' });
        }

        const resume = await resumeModel.findOne({
            _id: id,
            user: req.user.userId
        });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        res.status(200).json({
            message: 'Resume retrieved successfully',
            resume
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving resume',
            error: error.message
        });
    }
}

async function deleteResumeController(req, res) {
    try{
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Resume ID' });
        }

        const resume = await resumeModel.findOneAndDelete({
            _id: id,
            user: req.user.userId
        });
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        res.status(200).json({
            message: 'Resume deleted successfully',
            resume
        });
    }catch(error){
        res.status(500).json({
            message: 'Error deleting resume',
            error: error.message
        });
    }
}

module.exports = {
    uploadResumeController,
    getResumesController,
    getResumeByIdController,
    deleteResumeController
}