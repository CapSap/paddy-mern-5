import { useState } from "react";
import { OrderInfoFromDB, StoreLocation } from "./Types";

export const RequestCardFulll = ({
  order,
  id,
  store,
}: {
  order: OrderInfoFromDB;
  id: string;
  store: StoreLocation;
}) => {
  const [tracking, setTracking] = useState<string>();
  const [ibt, setIBT] = useState<string>();

  if (!order) {
    return <div>no order</div>;
  }
  return (
    <div
      className="flex basis-96 flex-shrink-0 grow border-cyan-100 border-8 m-3 p-3"
      id={id}
    >
      <div>
        <p>Order Number / reference: {order.orderNumber}</p>
        <p>
          Name: <span>{order.customerName}</span>
        </p>
        {order.notes ? <p>Notes: {order.notes}</p> : null}
        <p className="">Destination Store: {order.pickupLocation}</p>
        <p>Status: {order.orderedItems[0].requestStatus}</p>
        <p>Number of requests: {order.orderedItems.length}</p>

        <a href="#" className="font-bold">
          Link to magento order
        </a>
      </div>
      <div className="flex-grow  text-center">
        <p>Requests:</p>
        {order.orderedItems.map((request) => {
          return (
            <div className="m-2 border-2 p-4">
              <p>Sending store: {request.sendingStore}</p>
              <p>Items: {request.items}</p>
              <p>Status: {request.requestStatus}</p>
              {request.tracking ? <p>Tracking: {request.tracking}</p> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
