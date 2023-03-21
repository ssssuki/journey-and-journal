const router = require("express").Router();

module.exports = (db) => {
  router.get("/comments", (request, response) => {
    db.query(`SELECT * FROM comments;`).then(({ rows: comments }) => {
      response.json(comments);
    });
  });
  router.get("/comments/:id", (request, response) => {
    db.query(
      `SELECT comments.*, users.username 
      FROM comments 
      JOIN users 
      ON comments.user_id = users.id 
      WHERE post_id=${request.params.id}
      ORDER BY comments.id ASC`
    ).then(({ rows: comments }) => {
      response.json(comments);
    });
  });
  router.put("/comments", (request, response) => {
    const { user_id, post_id, content } = request.body.data;
    db.query(
      `
      INSERT INTO comments (user_id, post_id, content) VALUES ($1, $2, $3);
    `,
      [user_id, post_id, content]
    )
      .then((res) => {
        response.status(204).json({});
      })
      .catch((err) => console.log(err));
  });

  return router;
};
