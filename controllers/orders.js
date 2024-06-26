const pool = require('../sql/connection');
const { handleSQLError } = require('../sql/error');

const getAllOrders = async (req, res) => {
  try {
    let sql = "SELECT * FROM orders";
    const [rows] = await pool.query(sql);
    return res.json(rows);
  } catch (error) {
    handleSQLError(res, error);
  };
};

const getOrdersByUserID = async (req, res) => {
  const { user_id } = req.params;
  try {
    let sql = "SELECT * FROM orders WHERE user_id = ?";
    const values = [user_id];
    const [rows] = await pool.query(sql, values);
    return res.json(rows);
  } catch (error) {
    handleSQLError(res, error);
  };
};

const createOrder = async (req, res) => {
  const { user_id, order_total } = req.body;
  try {
    let sql = "INSERT INTO orders (user_id, order_total) VALUES (?, ?)";
    const values = [user_id, order_total];
    const [results] = await pool.query(sql, values);
    return res.json(results);
  } catch (error) {
    handleSQLError(res, error);
    return res.status(500).json({ message: "Error creating order" });
  }
};

module.exports = {
  getAllOrders,
  getOrdersByUserID,
  createOrder
};