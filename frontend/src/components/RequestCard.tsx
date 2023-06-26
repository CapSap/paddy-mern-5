import { useState } from "react";
import { OrderInfoFromDB, StoreLocation } from "../Types";

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

  function handleUpdate(request) {
    console.log(tracking, ibt, request);
    //
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
        <a className="text-red-900" href="#">
          Link to magento order
        </a>
      </div>
      <div className="">
        <p className="pl-2">Todos</p>
        {order.orderedItems
          .filter((request) => request.sendingStore === store)
          .map((request, index) => {
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
                <div className="">
                  <label
                    htmlFor="tracking"
                    className="text-gray-800 text-sm sm:text-base mb-2 pr-2 "
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
                </div>
                <div className="">
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
                </div>
                <button
                  className="mt-4 w-full inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
                  onClick={() => handleUpdate(request)}
                >
                  Update
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};
