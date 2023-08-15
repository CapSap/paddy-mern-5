import { FormEvent, useState } from "react";
import { OrderInfoFromDB, RequestFromDB, StoreLocation } from "../Types";

export const IbtReadyCard = ({
  order,
  id,
  getAllOrders,
}: {
  order: OrderInfoFromDB;
  id: string;
  getAllOrders: () => {};
}) => {
  if (!order) {
    return <div>no order</div>;
  }

  const [isIbtAccepeted, setIsIbtAccepted] = useState(false);

  async function handleUpdate(
    e: FormEvent<HTMLFormElement>,
    request: RequestFromDB
  ) {
    e.preventDefault();
    console.log(request);
    // create a new request. values are coming from state, where default state is from db.
    console.log(isIbtAccepeted);
    const newRequest = {
      ...request,
      isIbtAccepeted: isIbtAccepeted,
    };
    // build the new replacement order
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
    getAllOrders();
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
              <div>
                <form onSubmit={(e) => handleUpdate(e, request)}>
                  <label htmlFor="isIbtAccepeted" className="pr-2">
                    Has IBT been accepted?
                  </label>
                  <input
                    name="isIbtAccepeted"
                    type="checkbox"
                    checked={isIbtAccepeted}
                    onChange={() => setIsIbtAccepted(!isIbtAccepeted)}
                  />
                  {isIbtAccepeted ? (
                    <button
                      className="mt-4 w-full inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
                      type="submit"
                    >
                      Update
                    </button>
                  ) : null}
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
