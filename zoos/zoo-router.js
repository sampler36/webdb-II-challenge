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

router.get("/:id", (req, res) => {
    // retrieve a zoo by id
    db("zoos")
      .where({ id: req.params.id })
      .then((zoos) => {
        if (zoos) {
          res.status(200).json(zoos[0]);
        } else {
          res, status(404).json({ message: "zoos not found" });
        }
      })
      .catch((error) => {
        res.status(500).json(error);
      });
    // res.send('Write code to retrieve a zoo by id');
  });
  
  router.post("/", (req, res) => {
    // add a zoo to the database
    db("zoos")
      .insert(req.body)
      .then(([id]) => {
        db("zoos")
          .where({ id })
          .first()
          .then((zoos) => {
            res.status(200).json(zoos);
          })
          .catch((error) => {
            res.status(500).json(error);
          });
      });
  });
  


module.exports = router;
