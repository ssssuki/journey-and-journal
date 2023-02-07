const router = require("express").Router();

module.exports = (db) => {
  router.get("/searches/lat=:lat&lng=:lng", (request, response) => {
    db.query(
      `
    SELECT * FROM posts WHERE latitude BETWEEN ${
      Number(request.params.lat) - 1
    } AND ${Number(request.params.lat) + 1} AND longitude BETWEEN ${
        Number(request.params.lng) - 1
      } AND ${Number(request.params.lng) + 1}
    `
    ).then(({ rows: posts }) => {
      // console.log(posts);
      response.json(posts);
    });
  });
  return router;
};
