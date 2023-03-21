const express = require("express");
const router = express.Router();
const db = require('../db/connection');

/* GET home page. */
router.get("/", (req, res) => {
  db.query(`
  SELECT (posts.*) FROM posts
  ORDER BY rating DESC;
  `)
  .then(result => {
    res.json(result.rows);
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

module.exports = router;
