const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const userModel = require('../models/userModel');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await userModel.findOne({ googleId: profile.id });

    if (!user) {
      const email = profile.emails?.[0]?.value;
      if (email) {
        user = await userModel.findOne({ email });
      }
      if (user) {
        
        user.googleId = profile.id;
        await user.save();
      } else {
        
        user = await userModel.create({
          googleId: profile.id,
          fullname: {
            firstname: profile.name?.givenName || profile.displayName || 'User',
            lastname: profile.name?.familyName || ''
          },
          email: profile.emails?.[0]?.value
        });
      }
    }

    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

module.exports = passport;