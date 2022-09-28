const userService = require("../services/user_service");
const axios = require("axios");

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
  if (!(email && password)) {
    res.status(400).json({ message: "check input data" });
    return;
  }

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
  const latitude = req.params.latitude;
  const longitude = req.params.longitude;
  try {
    const closestShops = await userService.userLocationService(
      userId,
      latitude,
      longitude
    );
    res.status(200).json({ closestShops });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json(err.message);
  }
};

const shopMatchingController = async (req, res) => {
  const userId = req.userData.id;
  const shopId = req.body.id;
  const { latitude, longitude } = req.body;
  try {
    const shop = await userService.shopMatchingService(
      userId,
      shopId,
      latitude,
      longitude
    );
    res.status(200).json(shop);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json(err.message);
  }
};

const kakaoLogin = async (req, res) => {
  const kakaoToken = req.body.token;

  if (!kakaoToken) {
    res.status(400).json({ message: "this access token does not exist" });
    return;
  }

  try {
    const { data } = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: { Authorization: `Bearer ${kakaoToken}` },
    });

    const nickname = data.properties.nickname;
    const email = data.kakao_account.email;

    const token = await userService.kakaoLoginService(email, nickname);

    res.status(200).json({ message: "Success", token });
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
  shopMatchingController,
  kakaoLogin,
};
