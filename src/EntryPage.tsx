import React, { useState } from "react";

type storeLocation =
  | "Melbourne"
  | "Sydney"
  | "Ringwood"
  | "Canberra"
  | "Seven Hills"
  | "Fortutude Valley"
  | "Perth"
  | "Hobart";

type orderInfo = {
  orderNumber: string;
  customerName: string;
  pickupLocation: storeLocation;
  orderedItems: [
    {
      sendingStore: storeLocation;
      requestCommentHistory: [
        {
          hasIssue: boolean;
          author: string;
          store: storeLocation;
          message: string;
          dateTime: string;
          status: string;
        }
      ];
      items: [
        {
          qty: number;
          sku: string;
        }
      ];
    }
  ];
  fourHour: false;
  hasIssue: boolean;
  orderCommentHistory: [
    {
      author: string;
      store: storeLocation;
      message: string;
      dateTime: string;
      type: string;
    }
  ];
};

export const Entry = () => (
  <div>
    <h1 className="text-3xl font-bold underline">Hello entry!</h1>
  </div>
);
