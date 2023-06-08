export type StoreLocation =
  | "Melbourne"
  | "Sydney"
  | "Ringwood"
  | "Canberra"
  | "Seven Hills"
  | "Fortutude Valley"
  | "Perth"
  | "Hobart";

export type Order = {
  orderNumber: string;
  customerName: string;
  pickupLocation?: StoreLocation;
  orderedItems: Request[];
  isFourHour: boolean;
  notes?: string;
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
};

export type OrderInfoFromDB = Order & { _id: string };

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
