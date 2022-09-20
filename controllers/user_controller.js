const userService = require("../services/user_service");

const accountCheck = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    res.status(400 || 500).json({ message: "NO INPUT DATA" });
    return;
  }

  if (email.length > 50) {
    res.status(400 || 500).json({ ERROR: "too long account" });
    return;
  }
  try {
    await userService.accountCheck(email);
    res.status(200).json({ message: "signUp available" });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500).json(error.message);
  }
};

const signUpController = async (req, res) => {
  let { email, password, nickname, name, phoneNumber } = req.body;
  try {
    await userService.signUp(email, password, nickname, name, phoneNumber);

    res.status(200).json({ message: "userCreated" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json(err.message);
  }
};
module.exports = { accountCheck, signUpController };
