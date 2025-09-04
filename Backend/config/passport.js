const User = require("../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

module.exports = function(passport) {
    //Google Strategy
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:"/api/v1/auth/google/callback"
    }, async (accessToken, refreshToken, profile, done)=>{
        const existingUser = await User.findOne({googleId: profile.id});
        if(existingUser){
            return done(null, existingUser);
        }

        const newUser = new User({
            firstName:profile.name.givenName,
            lastName:profile.name.familyName,
            email:profile.emails[0].value,
            googleId:profile.id
        })

        await newUser.save()
        done(null, newUser);
        
    }));

}