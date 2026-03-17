const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
async function analyzeResume(resumeText, jobDescription) {

    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash"
    });

    const prompt = `
You are an ATS (Applicant Tracking System) resume analyzer.

Your job is to compare the candidate's resume with the job description and evaluate how well the resume matches the job.

Instructions:
1. Analyze the resume against the job description.
2. Identify important keywords from the job description that are missing in the resume.
3. Evaluate how well the resume matches the job requirements.
4. Provide practical suggestions to improve the resume for this specific job.

Return ONLY valid JSON in the following format:

{
  "score": number (0-100),
  "matchScore": number (0-100),
  "missingKeywords": ["keyword1","keyword2"],
  "suggestions": ["suggestion1","suggestion2","suggestion3"]
}

Scoring rules:
- "score" = overall ATS quality of the resume.
- "matchScore" = how well the resume matches the job description.
- missingKeywords = important keywords from the job description not present in the resume.
- suggestions = actionable improvements.

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const cleanText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
    let analysis;
    try {
        analysis = JSON.parse(cleanText);
    } catch (error) {
        throw new Error("Failed to parse AI response as JSON: " + error.message + " | Response: " + cleanText);
    }
    return analysis;
}

module.exports = { analyzeResume };