const router = require("express").Router();

module.exports = (db) => {
  router.get("/posts", (request, response) => {
    db.query(`SELECT * FROM posts;`).then(({ rows: posts }) => {
      response.json(posts);
    });
  });
  return router;
};
