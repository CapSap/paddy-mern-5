import express from "express";
import { createOne, deleteAll, getMany, updateOne } from "./controller";
import { Order } from "./model";

const router = express.Router();

router.route("/").get(getMany(Order)).post(createOne(Order));

router.route("/deleteAll").delete(deleteAll(Order));

router
  .route("/:id")
  .get((req, res) => {
    res.send({ message: `get order by id # ${req.params.id}` });
  })
  .put(updateOne(Order))
  .delete((req, res) => {
    res.send({ message: `archive order by id ${req.params.id}` });
  });

export default router;
