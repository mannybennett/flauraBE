const bcrypt = require('bcrypt');
const pool = require('../sql/connection');
const { handleSQLError } = require('../sql/error');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let sql = "SELECT * FROM users WHERE email = ?";
    const values = [email];
    const [rows] = await pool.query(sql, values);
    if (!rows.length) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // only 1 user per email
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      // Login successful (handle successful login logic here)
      return res.json({ message: "Login successful" });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    return handleSQLError(res, error);
  }
};


module.exports = {
  login
};