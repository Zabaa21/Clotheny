const server = require("express");
const router = server.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Google
// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["email", "profile"],
//   })
// );

// router.get(
//   "/google/callback",
//   passport.authenticate("google", { successRedirect: "http://localhost:3000" })
// );

router.get("/google",passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", (err, user) => {
    if (err) return next(err);
    if (!user) {
      res.redirect(`http://localhost:3000/login?error=401`);
    } else {
      const token = jwt.sign(user.toJSON(), "jwt-secret");
      res.redirect(`http://localhost:3000/?loginGoogle=true&t=${token}`);
    }
  })(req, res, next);
});

//Facebook
router.get("/facebook", passport.authenticate("facebook"));

router.get("/login/facebook/callback", (req, res, next) => {
  passport.authenticate("facebook", (err, user) => {
    if (err) return next(err);
    if (!user) {
      res.redirect(`http://localhost:3000/login?error=401`);
    } else {
      const token = jwt.sign(user.toJSON(), "jwt-secret");
      res.redirect(`http://localhost:3000/?loginFacebook=true&t=${token}`);
    }
  })(req, res, next);
});

// router.get("/login/facebook", passport.authenticate("facebook"));

// router.get("/facebook/callback", (req, res, next) => {
//   passport.authorize("facebook", (err, user) => {
//     if (err) return next(err);
//     if (!user) {
//       res.redirect(`http://localhost:3000/login?error=401`);
//     } else {
//       const token = jwt.sign(user.toJSON(), "jwt-secret");
//       res.redirect(`http://localhost:3000/loginuser?t=${token}`);
//     }
//   })(req, res, next);
// });

module.exports = router;
