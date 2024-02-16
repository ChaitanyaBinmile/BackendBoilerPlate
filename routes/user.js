const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await User.matchPasswordandGenerateToken(email, password);
    console.log(token);
    return res.cookie("token", token).redirect("/");
  } catch (e) {
    console.log(e);
    return res.render("signin", {
      error: "Incorrect Email or Password",
    });
  }
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log(fullName, email, password);
  await User.create({
    user: fullName,
    email,
    password,
  });
  return res.redirect("/user/signup");
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});
module.exports = router;
