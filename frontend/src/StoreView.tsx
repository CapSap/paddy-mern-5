import { useEffect, useState } from "react";
import { RequestCard } from "./RequestCard";
import { Order, OrderInfoFromDB, StoreLocation } from "./Types";

export const StoreView = () => {
  const [allOrders, setAllOrders] = useState<OrderInfoFromDB[]>();
  const [store, setStore] = useState<StoreLocation>("Canberra");

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

  // i need some functions to filter out allOrders and get relevant todos.

  const currentStoreTodos = allOrders.filter((order) => {
    return order.orderedItems.some((request) => {
      return request.sendingStore === store;
    });
  });

  console.log(currentStoreTodos);

  const incomingOrders = allOrders.filter((order) => {
    return order.pickupLocation === store;
  });

  const problemOrders = allOrders.filter((order) => {
    console.log(order.hasIssue);
    return order.hasIssue;
    // !!! js types and schema do not match. need to fixdis
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
          className="bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
        >
          <option selected={true} disabled={true} value={undefined}>
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
        <div className="flex flex-wrap">
          <h2 className="w-24">todos</h2>
          {currentStoreTodos.length > 1 ? (
            currentStoreTodos.map((order) => {
              return <RequestCard order={order} id={order._id} />;
            })
          ) : (
            <div>There are no todos for you!</div>
          )}
        </div>

        {/* maybe i should also include CNCs todo for your location, 
  CNCs for you to post to another store

*/}

        <div className="flex">
          <h2 className="w-24">incoming</h2>
          {incomingOrders.length > 1 ? (
            incomingOrders.map((order) => {
              return <RequestCard order={order} id={order._id} />;
            })
          ) : (
            <div>no orders incoming</div>
          )}
        </div>
        <div className="flex">
          <h2 className="w-24">problem</h2>
          {allOrders.length > 1 ? (
            allOrders.map((order) => {
              return <RequestCard order={order} id={order._id} />;
            })
          ) : (
            <div>No orders with problems</div>
          )}
        </div>
        <div className="flex ">
          <h2 className="w-24">Awaiting collection</h2>
          {awaitingCollectionOrders ? (
            awaitingCollectionOrders.map((order) => {
              return <RequestCard order={order} id={order._id} />;
            })
          ) : (
            <div>
              App thinks there are no orders awaitng customer collection
            </div>
          )}
        </div>
        <div className="flex ">
          <h2 className="w-24">All Orders</h2>
          {problemOrders.map((order) => {
            return <RequestCard order={order} id={order._id} />;
          })}
        </div>
      </div>
    </div>
  );
};
