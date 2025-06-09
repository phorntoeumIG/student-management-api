const db = require("../models");
const Users = db.Users;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email, password } });
    if (!user) {
      return res.send(
        '<script>alert("Invalid email or password"); window.location.href="/";</script>'
      );
    }
    const userData = user.get({ plain: true });
    delete userData.password;
    return res.redirect("/dashboard");
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
