import { useEffect, useState } from "react";
import { Order, OrderInfoFromDB, StoreLocation } from "../Types";
import { RequestCardFull } from "./RequestCardFull";
import { EcommCard } from "./EcommCard";

export const EcommView = () => {
  const [allOrders, setAllOrders] = useState<OrderInfoFromDB[]>();
  const store = "Seven Hills";

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

  const problemOrders = allOrders.filter((order) => {
    return order.hasIssue;
  });

  const pendingOrders = allOrders.filter((order) => {
    return !order.isArchived;
  });

  const ibtReadyOrders = allOrders.filter((order) => {
    return order.orderedItems.some(
      (request) => request.ibt && !request.isIbtAccepeted
    );
  });

  console.log(ibtReadyOrders);

  return (
    <div>
      Ecom view
      <div className="flex">
        <h2 className="w-1/4">Problem CNCs ({problemOrders.length})</h2>
        <div className="w-3/4 grid grid-cols-3">
          {problemOrders.length > 0 ? (
            problemOrders.map((order) => {
              return <EcommCard order={order} id={order._id} key={order._id} />;
            })
          ) : (
            <div>There are no problem CNCs!</div>
          )}
        </div>
      </div>
      <div className="flex">
        <h2 className="w-1/4">Pending CNCs ({pendingOrders.length})</h2>
        <div className="w-3/4 grid grid-cols-3">
          {pendingOrders.length > 0 ? (
            pendingOrders.map((order) => {
              return <EcommCard order={order} id={order._id} key={order._id} />;
            })
          ) : (
            <div>There are no todos for you!</div>
          )}
        </div>
      </div>
      <div className="flex">
        <h2 className="w-1/4">
          IBT ready for accept CNCs ({ibtReadyOrders.length})
        </h2>
        <div className="w-3/4 grid grid-cols-3">
          {ibtReadyOrders.length > 0 ? (
            ibtReadyOrders.map((order) => {
              return <EcommCard order={order} id={order._id} key={order._id} />;
            })
          ) : (
            <div>There are no todos for you!</div>
          )}
        </div>
      </div>
      <div className="flex">
        <h2 className="w-1/4">All CNCs ({allOrders.length})</h2>
        <div className="w-3/4 grid grid-cols-3">
          {allOrders.length > 0 ? (
            allOrders.map((order) => {
              return <EcommCard order={order} id={order._id} key={order._id} />;
            })
          ) : (
            <div>There are no todos for you!</div>
          )}
        </div>
      </div>
    </div>
  );
};
