import { useState } from "react";
import { OrderInfoFromDB, RequestFromDB, StoreLocation } from "../Types";

export const RequestCard = ({
  order,
  id,
  store,
}: {
  order: OrderInfoFromDB;
  id: string;
  store: StoreLocation;
}) => {
  const [tracking, setTracking] = useState<string>("");
  const [ibt, setIBT] = useState<string>("");
  const [requestStatus, setRequestStatus] = useState(
    order.orderedItems.find((request) => request.sendingStore === store)
      ?.requestStatus
  );

  if (!order) {
    return <div>no order</div>;
  }

  async function handleUpdate(request: RequestFromDB) {
    const newRequest = {
      ...request,
      tracking: tracking,
      ibt: ibt,
      requestStatus: requestStatus,
    };
    const newOrder = {
      ...order,
      orderedItems: [
        ...order.orderedItems.filter((req) => req._id !== request._id),
        newRequest,
      ],
    };

    const response = await fetch(`http://localhost:3000/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(newOrder),
    });

    console.log(await response.json());
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
                  <label
                    className="block text-slate-600 text-sm mb-2"
                    htmlFor="requestStatus"
                  >
                    Request status
                  </label>
                  <select
                    required={true}
                    id="requestStatus"
                    value={requestStatus}
                    onChange={(e) => {
                      setRequestStatus(e.target.value);
                    }}
                    defaultValue={"not touched"}
                    className="bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                  >
                    <option value="created">Created / Not touched </option>
                    <option value="Printed">Printed / being picked</option>
                    <option value="Posted">Posted</option>
                    <option value="ready">Ready for collection</option>
                  </select>
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
