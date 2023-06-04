import { Timestamp } from "mongodb";
import mongoose from "mongoose";

export interface Order {
  orderNumber: string;
  customerName: string;
  pickupLocation: string;
  notes: string;
  isArchived: boolean;
  orderedItems: request[];
  isFourHour: boolean;
}

interface request {
  items: string;
  sendingStore: string;
  ibt: number;
  tracking: string;
  message: string;
  requestStatus: string;
}

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    pickupLocation: {
      type: String,
    },
    notes: {
      type: String,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    orderedItems: [
      {
        items: { type: String, required: true },
        sendingStore: { type: String, required: true },
        ibt: { type: Number, default: null },
        tracking: { type: String, default: null },
        message: { type: String, default: null },
        requestStatus: { type: String, default: "created" },
      },
    ],
    isFourHour: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model<Order>("order", orderSchema);
