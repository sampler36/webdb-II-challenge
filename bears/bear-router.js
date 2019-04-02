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
  // get the bears from the database
  db("bears")
    .then((bears) => res.status(200).json(bears))
    .catch((error) => {
      res.status(500).json(error);
    });
  // res.send('Write code to retrieve all bears');
});

router.get("/:id", (req, res) => {
    // retrieve a zoo by id
    db("bears")
      .where({ id: req.params.id })
      .then((bears) => {
        if (bears) {
          res.status(200).json(bears[0]);
        } else {
          res, status(404).json({ message: "bears not found" });
        }
      })
      .catch((error) => {
        res.status(500).json(error);
      });
    // res.send('Write code to retrieve a zoo by id');
  });
  
  router.post("/", (req, res) => {
    // add a zoo to the database
    db("bears")
      .insert(req.body)
      .then(([id]) => {
        db("bears")
          .where({ id })
          .first()
          .then((bears) => {
            res.status(200).json(bears);
          })
          .catch((error) => {
            res.status(500).json(error);
          });
      });
  });
  
  router.delete("/:id", (req, res) => {
    db("bears")
      .where({ id: req.params.id })
      .del()
      .then((bears) => res.status(204).end())
      .catch((error) => res.status(500).json(error));
    // res.send("Write code to remove a role");
  });

  router.put("/:id", (req, res) => {
    // update roles
    db('bears')
    .where({id: req.params.id})
    .update(req.body)
    .then(count => {
      if(count > 0){
        db(bears)
        .where({id: req.params.id})
        .first()
        .then(bears => {
          res.status(200).json(bears)
        })
      } else {
        res.status(404).json({message:'Zoo Not Found'})
      }
    })
        .catch(error => {
          res.status(500).json(error);
        })
    })

module.exports = router;
