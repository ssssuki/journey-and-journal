const router = require("express").Router();

module.exports = (db) => {
  router.get("/users", (request, response) => {
    db.query(`SELECT * FROM users;`).then(({ rows: posts }) => {
      response.json(posts);
    });
  });
  router.get(`/users/:id`, (request, response) => {
    db.query(`SELECT * FROM users WHERE id=${request.params.id};`).then(
      ({ rows: posts }) => {
        response.json(posts);
      }
    );
  });
  return router;
};
