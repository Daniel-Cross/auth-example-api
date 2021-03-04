const express = require("express");
const router = express();
const User = require("../models/user");

// user registration
router.post("/", async (req, res) => {
  const user = await User({
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//user login
router.post("/login", function (req, res) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(401).json({
          message: "user not found",
        });
      } else {
        if (user.validatePassword(req.body.password)) {
          res.status(200).json(user);
        } else {
          res.status(401).json({
            message: "The username/password is incorrect",
          });
        }
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
    });
});

module.exports = router;
