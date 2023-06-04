import { HydratedDocument, Model } from "mongoose";
import { Order } from "./model";
import { Request, Response } from "express";

export const createOne =
  (model: Model<Order>) => async (req: Request, res: Response) => {
    try {
      const newDoc: HydratedDocument<Order> = await model.create({
        ...req.body,
      });
      if (!newDoc) {
        res.status(400).end();
      }
      res.status(200).json({ data: newDoc });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  };

export const getMany =
  (model: Model<Order>) => async (req: Request, res: Response) => {
    try {
      const docs = await model.find({ ...req.body }).exec();
      if (!docs) {
        res.status(400).end();
      }
      res.status(200).json({ data: docs });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  };

export const deleteAll =
  (model: Model<Order>) => async (req: Request, res: Response) => {
    try {
      const noOfDeletions = await model.deleteMany({});
      res.send({ data: `${noOfDeletions.deletedCount} documents deleted` });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  };

export const updateOne =
  (model: Model<Order>) => async (req: Request, res: Response) => {
    try {
      const doc = await model.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );

      if (!doc) {
        return res.status(400).end();
      }

      res.status(200).json({ data: doc });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  };
