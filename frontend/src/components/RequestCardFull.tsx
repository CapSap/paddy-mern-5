import { useState } from "react";
import { OrderInfoFromDB, StoreLocation } from "../Types";

export const RequestCardFull = ({
  order,
  id,
  store,
  getAllOrders,
}: {
  order: OrderInfoFromDB;
  id: string;
  store: StoreLocation;
  getAllOrders: () => {};
}) => {
  const [tracking, setTracking] = useState<string>();
  const [ibt, setIBT] = useState<string>();

  const orderConst = 1000197196;

  const orderLink = `https://www.paddypallin.com.au/agpallin_20/sales/order/view/order_id/${
    Number(order.orderNumber) - orderConst
  }/key/5e5d3132dbf47208b4f095eddd4167b41a43f84a7a55353ef4de8fdf13fad418/`;

  if (!order) {
    return <div>no order</div>;
  }
  return (
    <div className="border-indigo-100 border-2 m-3 p-3 rounded-xl" id={id}>
      <div className="mb-16 pl-4">
        <div className="pb-2">
          <p className="text-slate-600 text-sm">Reference / Order #:</p>
          <p>{order.orderNumber}</p>
        </div>
        <div className="pb-2">
          <p className="text-slate-600 text-sm">Name:</p>
          <p>{order.customerName}</p>
        </div>

        {order.notes ? (
          <div className="pb-2">
            <p className="text-slate-600 text-sm">Notes: </p>
            <p>{order.notes}</p>
          </div>
        ) : null}
        <div className="pb-2">
          <p className="text-slate-600 text-sm">Destination Store: </p>
          <p className="font-bold">{order.pickupLocation}</p>
        </div>
        <div className="pb-2">
          <p className="text-slate-600 text-sm">Status </p>

          <p>{order.orderedItems[0].requestStatus}</p>
        </div>
        <div className="pb-2">
          <p className="text-slate-600 text-sm">Number of requests: </p>
          <p> {order.orderedItems.length}</p>
        </div>
        <a className="text-red-900" href={orderLink}>
          Link to magento order
        </a>
      </div>
      <div className="">
        <p className="pl-2">Requests</p>
        {order.orderedItems.map((request, index) => {
          return (
            <div
              className="m-2 p-4 border-2 rounded-xl"
              key={order._id + index}
            >
              <div className="pb-2">
                <p className="text-slate-600 text-sm">Sending store: </p>
                <p className="text-base text-black">{request.sendingStore}</p>
              </div>
              <div className="pb-2">
                <p className="text-slate-600 text-sm">Items: </p>
                <p>{request.items}</p>
              </div>
              <div className="pb-2">
                <p className="text-slate-600 text-sm">Status </p>
                <p> {request.requestStatus}</p>
              </div>
              {request.tracking ? (
                <div className="pb-2">
                  <p className="text-slate-600 text-sm">Tracking </p>
                  <p> {request.tracking}</p>
                </div>
              ) : null}
              {request.ibt ? (
                <div className="pb-2">
                  <p className="text-slate-600 text-sm">IBT</p>
                  <p> {request.ibt}</p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
