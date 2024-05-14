const bcrypt = require('bcrypt');
const pool = require('../sql/connection');
const { handleSQLError } = require('../sql/error');

const getAllUsers = async (req, res) => {
  try {
    let sql = "SELECT * FROM users";
    const [rows] = await pool.query(sql);
    return res.json(rows);
  } catch (error) {
    handleSQLError(res, error);
  };
};

const createUser = async (req, res) => {
  const { first_name, email, password } = req.body;
  try {
    // Hash the password before storing it, using bcrypt
    // higher value = more secure, slower
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    let sql = "INSERT INTO users (first_name, email, password) VALUES (?, ?, ?)";
    const values = [first_name, email, hashedPassword];
    const [results] = await pool.query(sql, values);
    return res.json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating user" });
  }
};


module.exports = {
  getAllUsers,
  createUser
};