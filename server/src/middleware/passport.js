const passport = require("passport");
const Account = require("../models/account.model");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GG_CI,
      clientSecret: process.env.GG_SK,
      callbackURL: process.env.GG_CB,
    },
    (accessToken, refreshToken, profile, done) => {
      //   console.log(profile);
      Account.findOne(
        {
          email: profile.emails[0].value,
        },
        {}
      ).then((account) => {
        if (account) {
          //done(null, { id: account._id });
          done(null, account);
        } else {
          Account.create({
            username: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            avatar: profile.photos[0].value,
            auth: {
              google: {
                id: profile.id,
              },
            },
          }).then((account) => done(null, account));
        }
      });
    }
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_CI,
      clientSecret: process.env.FB_SK,
      callbackURL: process.env.FB_CB,
      profileFields: ["id", "displayName", "email", "photos"],
    },
    (accessToken, refreshToken, profile, done) => {
      Account.findOne({
        email: profile.emails[0].value,
      })
        .then((account) => {
          if (account) {
            done(null, account);
          } else {
            Account.create({
              username: profile.id,
              email: profile.emails[0].value,
              name: profile.displayName,
              avatar: profile.photos[0].value,
              auth: {
                facebook: {
                  id: profile.id,
                },
              },
            })
              .then((account) => done(null, account))
              .catch((err) => done(err, null));
          }
        })
        .catch((err) => {
          done(err, null);
        });
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((user, done) => {
  console.log("deserializeUser");
  Account.findOne({ _id: user })
    .then((account) => {
      console.log(account);
      done(null, account);
    })
    .catch((err) => {
      done(err, null);
    });
});
