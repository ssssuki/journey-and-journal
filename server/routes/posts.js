const router = require("express").Router();

module.exports = (db) => {
  router.get("/posts", (request, response) => {
    db.query(`SELECT * FROM posts;`).then(({ rows: posts }) => {
      response.json(posts);
    });
  });
  router.get("/posts/:id", (request, response) => {
    db.query(`SELECT * FROM posts WHERE id=${request.params.id}`).then(({ rows: posts }) => {
      response.json(posts);
    });
  });
  return router;
};
