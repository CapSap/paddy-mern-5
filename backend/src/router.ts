import express from "express";

const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.status(200);
    res.send({ message: "get all orders" });
  })
  .post((req, res) => {
    res.send({ message: `create an entry in db` });
  });

router
  .route("/:id")
  .get((req, res) => {
    res.send({ message: `get order by id # ${req.params.id}` });
  })
  .put((req, res) => {
    res.send({ message: `update order by id ${req.params.id}` });
  })
  .delete((req, res) => {
    res.send({ message: `archive order by id ${req.params.id}` });
  });

export default router;
