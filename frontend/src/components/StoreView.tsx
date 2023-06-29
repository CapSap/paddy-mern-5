import { useEffect, useState } from "react";
import { RequestCard } from "./RequestCard";
import { Order, OrderInfoFromDB, StoreLocation } from "../Types";
import { RequestCardFull } from "./RequestCardFull";

export const StoreView = () => {
  const [allOrders, setAllOrders] = useState<OrderInfoFromDB[]>();
  const [store, setStore] = useState<StoreLocation>("Canberra"); // need to change this defaukt state to "". react is throwing an error right now

  useEffect(() => {
    getAllOrders();
  }, []);

  async function getAllOrders() {
    const response = await fetch("http://localhost:3000/orders");
    const json = await response.json();
    setAllOrders(json.data);
  }

  if (!allOrders) {
    return <div>fetching data...</div>;
  }

  // simple cncs are where the collection store and sending store (store providing stock is the same)
  const simpleCncs = allOrders.filter((order) => {
    return (
      order.pickupLocation === store &&
      order.orderedItems.some((request) => request.sendingStore === store)
    );
  });

  const postingCncs = allOrders.filter((order) => {
    return (
      order.pickupLocation !== store &&
      order.orderedItems.some((request) => request.sendingStore === store)
    );
  });

  const incomingOrders = allOrders.filter((order) => {
    const result = order.orderedItems.every((req) => {
      console.log(req.sendingStore, store);

      return req.sendingStore === store;
    });
    console.log(result);

    return (
      // dont return orders where the entire order is being requested from { store }
      !order.orderedItems.every((request) => request.sendingStore === store) &&
      order.pickupLocation === store
    );
  });

  const problemOrders = allOrders.filter((order) => {
    console.log(order.hasIssue);
    return order.hasIssue;
  });

  const awaitingCollectionOrders = allOrders.filter((order) => {
    return order.orderedItems[0].requestStatus === "ready for pickup";
  });

  return (
    <div>
      <div>Welcome message + instructions?</div>
      <div>
        <label
          className="inline-block text-gray-800 text-sm sm:text-base mb-2"
          htmlFor="storeSelector"
        >
          Select your store:{" "}
        </label>
        <select
          required={true}
          id="storeSelector"
          value={store}
          onChange={(e) => {
            setStore(e.target.value as StoreLocation);
          }}
          defaultValue={"default"}
          className="bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
        >
          <option disabled={true} value={"default"}>
            Please select a store
          </option>

          <option value="Canberra">Canberra - 213</option>
          <option value="Fortitude Valley">Fortitude Valley - 416</option>
          <option value="Hobart">Hobart - 710</option>
          <option value="Melbourne">Melbourne - 314</option>
          <option value="Parramatta">Parramatta - 208</option>
          <option value="Perth">Perth - 615</option>
          <option value="Ringwood">Ringwood - 319</option>
          <option value="Sydney">Sydney - 210</option>
        </select>
      </div>

      <div className="p-6 ">
        <div className="flex">
          <h2 className="w-1/4">CNCs for your store ({simpleCncs.length})</h2>
          <div className="w-3/4 grid grid-cols-3">
            {simpleCncs.length > 0 ? (
              simpleCncs.map((order) => {
                return (
                  <RequestCard
                    store={store}
                    order={order}
                    id={order._id}
                    key={order._id}
                  />
                );
              })
            ) : (
              <div>There are no todos for you!</div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap">
          <h2 className="w-1/4">
            CNCs to post to another store ({postingCncs.length})
          </h2>
          {postingCncs.length > 0 ? (
            postingCncs.map((order) => {
              return (
                <RequestCard
                  store={store}
                  order={order}
                  id={order._id}
                  key={order._id}
                />
              );
            })
          ) : (
            <div>There are no cns for you to post out!</div>
          )}
        </div>

        <div className="flex flex-wrap">
          <h2 className="w-1/4">
            CNCs incoming to your store ({incomingOrders.length})
          </h2>
          <div className="w-3/4 grid grid-cols-3">
            {incomingOrders.length > 0 ? (
              incomingOrders.map((order) => {
                return (
                  <RequestCardFull
                    store={store}
                    order={order}
                    id={order._id}
                    key={order._id}
                  />
                );
              })
            ) : (
              <div>No orders incoming</div>
            )}
          </div>
        </div>
        <div className="flex">
          <h2 className="w-1/4">Problem CNCs ({problemOrders.length})</h2>
          {problemOrders.length > 0 ? (
            problemOrders.map((order) => {
              return (
                <RequestCard
                  store={store}
                  order={order}
                  id={order._id}
                  key={order._id}
                />
              );
            })
          ) : (
            <div>No orders with problems</div>
          )}
        </div>
        <div className="flex flex-wrap">
          <h2 className="w-1/4">
            Awaiting collection ({awaitingCollectionOrders.length})
          </h2>
          {awaitingCollectionOrders.length > 0 ? (
            awaitingCollectionOrders.map((order) => {
              return (
                <RequestCard
                  store={store}
                  order={order}
                  id={order._id}
                  key={order._id}
                />
              );
            })
          ) : (
            <div>
              App thinks there are no orders awaitng customer collection
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
