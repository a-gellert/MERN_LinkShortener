const { Router } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = Router();

router.post(
   "/signup",
   [
      check("email", "Wrong email").isEmail(),
      check("password", "Minimal password lenght is 6 symbols").isLength({
         min: 6,
      }),
   ],

   async (req, res) => {
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.status(400).json({
               errors: errors.array(),
               message: "invalid registration data",
            });
         }
         const { email, password } = req.body;
         const candidate = await User.findOne({ email });
         if (candidate) {
            return res
               .status(400)
               .json({ message: "Email is already registered!" });
         }
         const hashedPassword = await bcrypt.hash(password, 12);

         console.log(hashedPassword);
         const user = new User({ email: email, password: hashedPassword });

         await user.save();

         res.status(201).json({ message: "The user created!" });
      } catch (error) {
         res.status(500).json({ message: "Something went wrong!" });
      }
   }
);
router.post(
   "/login",
   [
      check("email", "Enter valid email").isEmail(),
      check("password", "Enter password").exists(),
   ],
   async (req, res) => {
      try {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            return res.status(400).json({
               errors: errors.array(),
               message: "Invalid login data",
            });
         }

         const { email, password } = req.body;
         console.log(email);
         const user = await User.findOne({ email });
         if (!user) {
            console.log(user);
            return res.status(400).json({ message: "The user is not found" });
         }
         const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) {
            return res.status(400).json({ message: "Not correct password" });
         }
         const token = jwt.sign(
            { userId: user.id },
            config.get("jwtSecretKey"),
            { expiresIn: "1h" }
         );
         res.json({ token, userId: user.id });
      } catch (error) {
         res.status(500).json({ message: "Something went wrong!" });
      }
   }
);
module.exports = router;
