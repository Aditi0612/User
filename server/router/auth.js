const express = require("express");
const router = express.Router();

require("../db/conn");
const User = require("../model/user");

router.get("/", (req, res) => {
  res.send("Hello World from the server router");
});

router.post("/reg", async (req, res) => {
  const {
    username,
    email,
    phone,
    aphone,
    ad1,
    ad2,
    state,
    pin,
    prof,
    edq,
    cllg,
    course,
    pass,
    cpass,
    compT,
  } = req.body;

  if (
    !username ||
    !email ||
    !phone ||
    !aphone ||
    !ad1 ||
    !ad2 ||
    !state ||
    !pin ||
    !prof ||
    !edq ||
    !cllg ||
    !course ||
    !pass ||
    !cpass
  ) {
    return res.status(422).json({ error: "Please fill the field" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res
        .status(422)
        .json({ error: "This email is already registered" });
    }
    const user = new User(req.body);
    const userReg = await user.save();
    if (userReg) {
      res.status(201).json({ message: "User registered successfully" });
    } else {
      res.status(500).json({ error: "Failed to register" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
