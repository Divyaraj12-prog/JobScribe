const express = require('express');
const cookieParser = require('cookie-parser');
require('./config/passportGoogle');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/authRoutes');
const appRoutes = require('./routes/applicationRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const aiRoutes = require('./routes/aiRoutes');
const dashBoardRoutes = require('./routes/dashBoardRoutes');
const passport = require('passport');

const app = express();

const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const primaryFrontendOrigin = allowedOrigins[0] || process.env.FRONTEND_URL;

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use(passport.initialize());

app.get('/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

app.get('/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: `${primaryFrontendOrigin}/login`, session: false }),
  (req, res) => {
    const token = jwt.sign({
      userId: req.user._id,
      fullName: req.user.fullname,
      email: req.user.email,
      role: req.user.role
    }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.redirect(`${primaryFrontendOrigin}/dashboard`);
  }
);

app.use('/api/auth', authRoutes);
app.use('/api/applications', appRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/dashboard', dashBoardRoutes);

module.exports = app;