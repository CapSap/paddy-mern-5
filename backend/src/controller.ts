import { HydratedDocument, Model } from "mongoose";
import { Order } from "./model";
import { Request, Response } from "express";

export const createOne =
  (model: Model<Order>) => async (req: Request, res: Response) => {
    const newDoc: HydratedDocument<Order> = await model.create({ ...req.body });
    console.log(newDoc);
    if (!newDoc) {
      res.status(400).end();
    }
    res.status(200).json({ data: newDoc });
  };

export const createOne2 =
  (model: Model<Order>) => async (req: Request, res: Response) => {
    try {
      const newDoc: HydratedDocument<Order> = await model.create({
        ...req.body,
      });
      console.log(newDoc);
      res.status(200).json({ data: newDoc });
    } catch {
      (e: Error) => console.log(e);
    }
  };

export const createOne4 =
  (model: Model<Order>) => async (req: Request, res: Response) => {
    const newDoc = new model({ ...req.body });
    await newDoc.save().then(() => {
      console.log(newDoc);
    });
    res.send({ data: newDoc });
  };

export const getMany =
  (model: Model<Order>) => async (req: Request, res: Response) => {
    const docs = await model.find({}).exec();
    res.status(200).json({ data: docs });
  };

export const deleteAll =
  (model: Model<Order>) => async (req: Request, res: Response) => {
    try {
      const noOfDeletions = await model.deleteMany({});
      res.send({ data: `${noOfDeletions.deletedCount} documents deleted` });
    } catch {
      (e: Error) => console.log(e);
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
      res.status(200).json({ data: doc });
    } catch (e) {
      console.log(e);
    }
  };
