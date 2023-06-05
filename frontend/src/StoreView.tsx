import { useEffect, useState } from "react";
import { RequestCard } from "./RequestCard";

export const StoreView = () => {
  const [allOrders, setAllOrders] = useState();

  useEffect(() => {
    getAllOrders();
  }, []);

  async function getAllOrders() {
    const response = await fetch("http://localhost:3000/orders");
    const json = await response.json();
    setAllOrders(json.data);
  }

  if (!allOrders) {
    return <div>no data</div>;
  }

  return (
    <div>
      <div className="flex">
        <h2>todos</h2>
        {allOrders.map((order) => {
          return <RequestCard request={order} />;
        })}
      </div>
    </div>
  );
};
