const jwt = require("jsonwebtoken");

const { AUTH_TOKEN_SECRET } = process.env;

const validateToken = async (req, res, next) => {
  try {
    const accesstoken = req.headers.authorization;

    const { userId } = jwt.verify(token, AUTH_TOKEN_SECRET);
  } catch {}
};
