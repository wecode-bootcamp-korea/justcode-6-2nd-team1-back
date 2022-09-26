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
    const error = new Error(0);
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
    ) VALUES (?,?,?,?,?,30000);
    `,
    [email, password, nickname, name, phoneNumber]
  );
  return;
};

const getUserById = async (userId) => {
  const [userData] = await myDataSource.query(
    `SELECT id FROM users WHERE id = ?
    `,
    [userId]
  );
  return userData;
};

const getUserByEmail = async (email) => {
  const userData = await myDataSource.query(
    `SELECT id, password FROM users WHERE email = ?`,
    [email]
  );
  return userData;
};

const ModifyUserLocation = async (userId, locationId) => {
  await myDataSource.query(
    `UPDATE users 
     SET shop_location_id = ? 
     WHERE id = ?
    `,
    [locationId, userId]
  );
};
module.exports = {
  getAccountData,
  createUser,
  getUserById,
  getUserByEmail,
  ModifyUserLocation,
};
