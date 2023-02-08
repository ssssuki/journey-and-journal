const router = require("express").Router();

module.exports = (db) => {
  router.get("/posts", (request, response) => {
    db.query(`SELECT * FROM posts;`).then(({ rows: posts }) => {
      response.json(posts);
    });
  });
  router.get("/posts/:id", (request, response) => {
<<<<<<< HEAD
    db.query(`SELECT * FROM posts WHERE id=${request.params.id};`).then(
      ({ rows: posts }) => {
        response.json(posts);
      }
    );
  });
  router.put("/posts", (request, response) => {
    const {
      user_id,
      title,
      entry,
      rating,
      photo_link,
      latitude,
      longitude,
      address,
    } = request.body.data;
    db.query(
      `
      INSERT INTO posts (user_id, title, entry, rating, photo_link, latitude, longitude, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `,
      [user_id, title, entry, rating, photo_link, latitude, longitude, address]
    )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
=======
    db.query(`SELECT * FROM posts WHERE id=${request.params.id}`).then(({ rows: posts }) => {
      response.json(posts);
    });
>>>>>>> 6ad548548fef46e7056aebbc5c0ac1a99d40caec
  });
  return router;
};
