export type StoreLocation =
  | "Melbourne"
  | "Sydney"
  | "Ringwood"
  | "Canberra"
  | "Seven Hills"
  | "Fortutude Valley"
  | "Perth"
  | "Hobart";

export type OrderInfo = {
  orderNumber: string;
  customerName: string;
  pickupLocation?: StoreLocation;
  orderedItems: Request[];
  fourHour: boolean;
  hasIssue: boolean;
  notes?: string;
  orderCommentHistory?: [
    {
      author: string;
      store: StoreLocation;
      message: string;
      dateTime: string;
    }
  ];
};

export type OrderInfoFromDB = OrderInfo & { _id: string };

export type Request = {
  sendingStore?: StoreLocation;
  requestStatus: string | undefined;
  items?: string;
  requestCommentHistory?: [
    {
      author: string;
      store: StoreLocation;
      message: string;
      dateTime: string;
    }
  ];
};
