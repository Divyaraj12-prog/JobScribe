const mongoose = require('mongoose');
const resumeModel = require('../models/resumeModel');
const pdfParse = require('pdf-parse');
const aiServices = require('../services/aiServices');
const fs = require('fs');

async function analyzeResumeController(req, res) {
    try{
        const { resumeId } = req.params;
        const jobDescription = req.body.jobDescription || '';

        if(!mongoose.Types.ObjectId.isValid(resumeId)) {
            return res.status(400).json({ message: 'Invalid Resume ID' });
        }

        if(!jobDescription || jobDescription.trim().length <30) {
            return res.status(400).json({ message: 'Job description is too short' });
        }

        const resume = await resumeModel.findOne({
            _id: resumeId,
            user: req.user.userId
        });
        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        const fileBuffer = fs.readFileSync(resume.fileUrl);
        const pdfdata = await pdfParse(fileBuffer);

        const resumeText = pdfdata.text.slice(0, 15000);

        const analysisResult = await aiServices.analyzeResume(resumeText, jobDescription);

        if(!analysisResult.score || !analysisResult.matchScore) {
            return res.status(500).json({ message: 'Invalid analysis result from AI service' });
        }

        resume.atsScore = analysisResult.score;
        resume.matchScore = analysisResult.matchScore;
        resume.missingKeywords = analysisResult.missingKeywords;
        resume.analysis = analysisResult.suggestions;
        
    
        await resume.save();

        res.status(200).json({
            message: ' ATS Resume analyzed successfully',
            analysisResult
        });
    }catch(error){
        res.status(500).json({
            message: 'Error analyzing resume',
            error: error.message
        });
    }
}

module.exports = { analyzeResumeController };