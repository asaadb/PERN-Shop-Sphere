const pool = require("../db");
const bcrypt = require("bcrypt");

// Register a new user
async function registerUser(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Username, email, and password are required." });
  }
  try {
    // Check if user already exists
    const userExists = await pool.query(
      "SELECT id FROM users WHERE username = $1 OR email = $2",
      [username, email],
    );
    if (userExists.rows.length > 0) {
      return res
        .status(409)
        .json({ error: "Username or email already exists." });
    }
    // Hash password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const password_hash = await bcrypt.hash(password, salt);
    // Insert new user
    const result = await pool.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email, created_at",
      [username, email, password_hash],
    );
    const newUser = result.rows[0];
    res.status(201).json({ user: newUser });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Server error during registration." });
  }
}

module.exports = { registerUser };
