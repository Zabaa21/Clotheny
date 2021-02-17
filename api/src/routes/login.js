const server = require("express");
const router = server.Router();
const { User } = require("../db.js");
const nodemailer = require('nodemailer');
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcrypt");

router.post("/", (req, res, next) => {
  passport.authenticate("login", (err, response, info) => {
    if (err){
      return next(err);
    } 
    if (!response) {
      if(info === "googleFacebook"){
        res.json({message: "This account is linked with Google or Facebook. Try again."})
      }
      else{
        res.json({message: "The password is wrong. Try again."})
      }
    } else {
      return res.send(
        jwt.sign(
          response.toJSON(),
          "jwt-secret"
        )
      );
    }
  })(req, res, next);
});


// ============ Forgot Password ============ //

const token = Math.floor((Math.random() * 1000000) + 1);

router.post('/forgot', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then((user) => {
      if (!user){
        return res.status(400).json({
        err: "Invalid email",
      }).redirect('/')
      }    
      user.update({
        ...user,
        passwordResetToken: token,
        passwordResetExpires: Date.now() + 500000
      }).then(()=>{
        const transporter = nodemailer.createTransport({
          host: "c2110783.ferozo.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
          user: 'shop@henryshop.ml', // generated ethereal user
          pass: 'RUq*bn/0fY', // generated ethereal password
          },
          
        })
        const resetLink = 'http://localhost:3000/login/reset'
        const mailOptions = {
          from: 'shop@henryshop.ml',
          to: req.body.email,
          subject: 'Password reset',
          html: `To reset your password click in the following link and then fill the token indicated below <br><a href=${resetLink}> Link </a><br>
          Your Token: ${token}`
        }

        transporter.sendMail(mailOptions, (err, success) => {
            if (err) {
                res.status(400).json({
        err: "ERROR SENDING EMAIL",
         })   } })
             })
             
       res.json({message: "Check email inbox"})
  })
})

// ============ Reset Password ============ //

router.post('/reset', async (req, res, next) => {
  try {
    const user = await User.findOne({
        where: {passwordResetToken: req.query.token}
    })
    if (!user) {
      res.status(500).json({message: 'There has been an error validating user'})
    }else{
      const hasshed = await bcrypt.hash(req.body.password, 10)
      if (user.passwordResetExpires > Date.now()) {
        const update = await user.update({
          ...user,
          password: hasshed,
          resetPasswordExpires: null,
          resetPasswordToken: null,
        })
        res.json({
          message: 'Password reset ok'
          });
      }
    }
  }catch (e) {
     res.status(500).json({
     message: 'There has been an error'
     });
     next(e);
   }
})

module.exports = router;
