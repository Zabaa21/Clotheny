const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken")
const { User } = require("../db");

const { GOOGLE_ID, GOOGLE_SECRET, FACEBOOK_ID, SECRET_FACEBOOK } = process.env;

//Estrategia Local
passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({
          where: {
            email,
          },
        });
        if (!user) {
          return done(null, false);
        }
        if(user.password){
          bcrypt.compare(password, user.password).then((response) => {
            if (response !== true) {
              return done(null, false, "password");
            }
            console.log("User found & Authenticated");
            return done(null, user);
          });
        }
        else{
          done(null, false, "googleFacebook")
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: "jwt-secret",
};

//Validate JWT
passport.use(
  "jwt",
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      User.findOne({
        where: {
          id: jwt_payload.id,
        },
      }).then((user) => {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  })
);

//Google
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
      callbackURL: `http://localhost:3001/auth/google/callback`,
      session: false,
    },
    async (accessToken, refreshToken, profile, done) => {
      const googleUser = profile._json;
      try {
        let user = await User.findOne({ where: {email: googleUser.email} })
        if(!user){
          user = await User.create({
            name: googleUser.given_name,
            lastName: googleUser.family_name,
            email: googleUser.email,
            role: 0,
            image: googleUser.picture,
          })
        }
        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

//Facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_ID,
      clientSecret: SECRET_FACEBOOK,
      callbackURL: `http://localhost:3001/auth/login/facebook/callback`,
      profileFields: ["id", "email", "displayName", "first_name", "last_name"],
      scope: ["email"],
      session: false,
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log(profile.emails[0].value);
      console.log(profile)
      const email = profile.emails[0].value;
      try {
        let user = await User.findOne({ where: {email} })
        if(!user){
          user = await User.create({
            name: profile.name.givenName,
            lastName: profile.name.familyName,
            email,
            role: 0,
          })
        }
        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  new BearerStrategy((token, done) => {
    jwt.verify(token, "jwt-secret", (err, user) => {
      if (err) return done(err);
      return done(null, user ? user : false);
    });
  })
);

module.exports = passport;
