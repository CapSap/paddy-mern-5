import { useEffect, useState } from "react";
import { RequestCard } from "./RequestCard";

export const StoreView = () => {
  const [allOrders, setAllOrders] = useState();
  const [store, setStore] = useState();

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
    order.orderedItems.some(request => request.sendingStore === store)
  }
 )
  };

  const incomingOrders = allOrders.filter((order) => {
    return order === store;
  });

  return (
    <div>
      <div>Welcome message + instructions?</div>
      <div className="p-6 ">
        <div className="flex ">
          <h2 className="w-24">todos</h2>
          {allOrders.map((order) => {
            return <RequestCard request={order} />;
          })}
        </div>
        <div className="flex">
          <h2 className="w-24">incoming</h2>
          {allOrders.map((order) => {
            return <RequestCard request={order} />;
          })}
        </div>
        <div className="flex">
          <h2 className="w-24">problem</h2>
          {allOrders.map((order) => {
            return <RequestCard request={order} />;
          })}
        </div>
      </div>
    </div>
  );
};
