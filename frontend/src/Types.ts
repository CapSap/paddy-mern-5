export type StoreLocation =
  | "Melbourne"
  | "Sydney"
  | "Ringwood"
  | "Canberra"
  | "Seven Hills"
  | "Fortitude Valley"
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

export type OrderInfoFromDB = {
  _id: string;
  orderNumber: string;
  customerName: string;
  pickupLocation?: StoreLocation;
  orderedItems: RequestFromDB[];
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

export type RequestFromDB = {
  _id: string;
  sendingStore: StoreLocation;
  requestStatus: string;
  items: string;
  tracking: string | undefined;
  ibt: string | undefined;
  isIbtAccepeted: boolean;
  requestNotes: string;
  requestCommentHistory?: [
    {
      author: string;
      store: StoreLocation;
      message: string;
      dateTime: string;
    }
  ];
};

export type Request = {
  sendingStore: StoreLocation | undefined;
  requestStatus: string | undefined;
  items: string | undefined;
  tracking: string | undefined;
  ibt: string | undefined;
  isIbtAccepeted: boolean;
  requestCommentHistory?: [
    {
      author: string;
      store: StoreLocation;
      message: string;
      dateTime: string;
    }
  ];
};
