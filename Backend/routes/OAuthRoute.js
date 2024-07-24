const express = require('express');
const router = express.Router();
const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const jwt = require('jsonwebtoken');
const { CreateJWT } = require('../controller/UserController');
require('dotenv').config();
passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: '/OAuth/google/callback',
    passReqToCallback: true
},
async (req, accessToken, refreshToken, profile, done) => {
    try {
        const token = await CreateJWT({ email: profile.emails[0].value, access_token: accessToken });
        return done(null, { token });
    } catch (error) {
        return done(error);
    }
}));

// Endpoint for Google OAuth
router.get('/google',
    passport.authenticate('google', { session: false, scope: ['profile', 'email'] })
);

// Callback for finnish Google OAuth
router.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/' }),
    (req, res) => {
        const token = req.user.token; 
        res.redirect(`/OAuth/login/${token}`);

    }
);
router.get('/login/:token', (req, res) => {
    console.log("token se posatvlja na " + req.params.token)
    if(req.params.token!="")
        res.redirect(`http://localhost:3000/Dashboard?token=${req.params.token}`)
    else
    res.send('Error');
});
router.get('/logout', (req, res) => {
    // LOggout
    res.redirect('/');
});

module.exports = router;
