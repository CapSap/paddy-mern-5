import { useState } from "react";
import { OrderInfoFromDB, StoreLocation } from "./Types";

export const RequestCard = ({
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
      className=" basis-96 flex-shrink-0 grow border-cyan-100 border-8 m-3 p-3"
      id={id}
    >
      <div className="border-red-300 border-2">
        <p>Order Number / reference: {order.orderNumber}</p>
        <p>
          Name: <span>{order.customerName}</span>
        </p>
        {order.notes ? <p>Notes: {order.notes}</p> : null}
        <p className="font-bold">Destination Store: {order.pickupLocation}</p>
        <p>Status: {order.orderedItems[0].requestStatus}</p>
        <p>Number of requests: {order.orderedItems.length}</p>

        <a href="#">Link to magento order</a>
      </div>
      <div className="flex-grow  text-center border-teal-400 border-2">
        <p>Requests:</p>
        {order.orderedItems
          .filter((request) => request.sendingStore === store)
          .map((request) => {
            return (
              <div className="m-2 border-2 p-4">
                <p>Sending store: {request.sendingStore}</p>
                <p>Items: {request.items}</p>
                <p>Status: {request.requestStatus}</p>
                <div className="flex">
                  <label
                    htmlFor="tracking"
                    className="text-gray-800 text-sm sm:text-base mb-2 pr-2"
                  >
                    Tracking:{" "}
                  </label>
                  <input
                    required={true}
                    type="text"
                    name="tracking"
                    id="tracking"
                    value={tracking}
                    onChange={(e) => setTracking(e.target.value)}
                    className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  />
                  <button>Update Tracking</button>
                </div>
                <div className="flex">
                  <label
                    htmlFor="ibt"
                    className="text-gray-800 text-sm sm:text-base mb-2 pr-2"
                  >
                    IBT:{" "}
                  </label>
                  <input
                    required={true}
                    type="text"
                    name="ibt"
                    id="ibt"
                    value={ibt}
                    onChange={(e) => setIBT(e.target.value)}
                    className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  />
                  <button>Update IBT</button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
