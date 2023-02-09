const router = require("express").Router();

module.exports = (db) => {
  router.get("/likes", (request, response) => {
    db.query(`SELECT * FROM likes;`).then(({ rows: likes }) => {
      response.json(likes);
    });
  });
  router.get("/likes/:id", (request, response) => {
    db.query(`SELECT * FROM likes WHERE user_id=${request.params.id}`).then(({ rows: likes }) => {
      response.json(likes);
    });
  });
  router.put("/likes", (request, response) => {
    const {
      user_id,
      post_id,
    } = request.body.data;
    db.query(
      `
      INSERT INTO likes (user_id, post_id) VALUES ($1, $2);
    `,
      [user_id, post_id]
    )
      .then((res) => {
        response.status(204).json({})
      })
      .catch((err) => console.log(err));
  });

  return router;
};
