const { myDataSource } = require("./common");

const getAccountData = async (email) => {
  const [emailData] = await myDataSource.query(
    `
      SELECT email 
        FROM users 
        WHERE email = ?`,
    [email]
  );
  if (!emailData) {
    return;
  } else if (emailData.email === email) {
    const error = new Error("already exist account");
    error.statusCode = 400;
    throw error;
  }
};

const createUser = async (email, password, nickname, name, phoneNumber) => {
  await myDataSource.query(
    `
    INSERT INTO users(
      email,
      password,
      nickname,
      name,
      phone_number,
      point
    ) VALUES (?,?,?,?,?,10000);
    `,
    [email, password, nickname, name, phoneNumber]
  );
  return;
};
module.exports = {
  getAccountData,
  createUser,
};
