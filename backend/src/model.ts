import { Timestamp } from "mongodb";
import mongoose from "mongoose";

type StoreLocation =
  | "Melbourne"
  | "Sydney"
  | "Ringwood"
  | "Canberra"
  | "Seven Hills"
  | "Fortutude Valley"
  | "Perth"
  | "Hobart";

export interface Order {
  orderNumber: string;
  customerName: string;
  pickupLocation: StoreLocation;
  orderedItems: Request[];
  isFourHour: boolean;
  notes: string;
  isArchived: boolean;
  hasIssue: boolean;
  orderCommentHistory?: [
    {
      author: string;
      store: StoreLocation;
      message: string;
      dateTime: string;
    }
  ];
}

interface Request {
  sendingStore: StoreLocation;
  requestStatus: string | undefined;
  items?: string;
  tracking: string;
  requestCommentHistory?: [
    {
      author: string;
      store: StoreLocation;
      message: string;
      dateTime: string;
    }
  ];
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
