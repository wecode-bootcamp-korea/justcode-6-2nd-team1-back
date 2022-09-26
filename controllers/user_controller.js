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
    res.status(200).json("1");
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500).json(error.message);
  }
};

const signUpController = async (req, res) => {
  let { email, password, nickname, name, phoneNumber } = req.body;

  if (!(email && password && nickname && name && phoneNumber)) {
    res.status(400 || 500).json({ message: "CHECK NECESSARY INPUT DATA" });
    return;
  }

  try {
    await userService.signUpService(
      email,
      password,
      nickname,
      name,
      phoneNumber
    );

    res.status(200).json({ message: "userCreated" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json(err.message);
  }
};

const logInController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userService.logInService(email, password);
    res.status(201).json({ message: "Login Success", token });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const userLocationController = async (req, res) => {
  const userId = req.userData.id;
  const locationId = req.params.id;

  try {
    await userService.userLocationService(userId, locationId);
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json(err.message);
  }
};

module.exports = {
  accountCheck,
  signUpController,
  logInController,
  userLocationController,
};
