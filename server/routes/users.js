const express = require("express");
const db = require("../db/connection");
const router = express.Router();

/* GET users listing. */

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    db.query(`
      SELECT posts.* FROM posts
      LEFT JOIN users
      ON user.id = user_id
      WHERE user_id = $1
    `, [req.params.id])
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
  return router;  
}


