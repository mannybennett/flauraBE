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
      req.session.user = { id: user.id };
      return res.json({ message: "Login successful" });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    return handleSQLError(res, error);
  }
};

const logout = (req, res) => {
  if (req.session && req.session.user) {
    // destroy session
    req.session.destroy(function(err) {
      if(err) {
        return res.json({ message: 'Logout failed' });
      } else {
        return res.json({ message: 'Logout successful' });
      };
    });
  } else {
    return res.json({ message: 'No user to log out' });
  };
};

module.exports = {
  login,
  logout
};