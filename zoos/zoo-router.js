const router = require("express").Router();
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    //relative to the root folder
    filename: "./data/zoo.db3"
  }
};
const db = knex(knexConfig);
// router.use

router.get("/", (req, res) => {
  // get the zoos from the database
  db("zoos")
    .then((zoos) => res.status(200).json(zoos))
    .catch((error) => {
      res.status(500).json(error);
    });
  // res.send('Write code to retrieve all zoos');
});


module.exports = router;
