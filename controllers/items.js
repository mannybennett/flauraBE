const pool = require('../sql/connection');
const { handleSQLError } = require('../sql/error');

const getItemsByOrderID = async (req, res) => {
  const { order_id } = req.params;
  try {
    let sql = "SELECT * FROM order_items WHERE order_id = ?";
    const values = [order_id];
    const [rows] = await pool.query(sql, values);
    return res.json(rows);
  } catch (error) {
    handleSQLError(res, error);
  };
};

const createItem = async (req, res) => {
  const { order_id, plant_name, plant_image, quantity, price } = req.body;
  try {
    let sql = "INSERT INTO order_items (order_id, plant_name, plant_image, quantity, price) VALUES (?, ?, ?, ?, ?)";
    const values = [order_id, plant_name, plant_image, quantity, price];
    const [results] = await pool.query(sql, values);
    return res.json(results);
  } catch (error) {
    handleSQLError(res, error);
    return res.status(500).json({ message: "Error creating item" });
  };
};

module.exports = {
  getItemsByOrderID,
  createItem
};