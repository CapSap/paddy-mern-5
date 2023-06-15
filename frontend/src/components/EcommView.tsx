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

  // simple cncs are where the collection store and sending store (store providing stock is the same)
  const problemOrders = allOrders.filter((order) => {
    return order.hasIssue;
  });

  const pendingOrders = allOrders.filter((order) => {
    return !order.isArchived;
  });

  const ibtReadyOrders = allOrders.filter((order) => {
    return order.orderedItems.some((request) => !request.isIbtAccepeted);
  });

  console.log(allOrders);

  const awaitingCollectionOrders = allOrders.filter((order) => {
    return order.orderedItems[0].requestStatus === "ready for pickup";
  });

  return (
    <div>
      Ecom view
      <div className="flex">
        <h2 className="w-1/4">Problem CNCs ({problemOrders.length})</h2>
        <div className="w-3/4 grid grid-cols-3">
          {problemOrders.length > 1 ? (
            problemOrders.map((order) => {
              return <EcommCard order={order} id={order._id} />;
            })
          ) : (
            <div>There are no problem CNCs!</div>
          )}
        </div>
      </div>
      <div className="flex">
        <h2 className="w-1/4">Pending CNCs ({pendingOrders.length})</h2>
        <div className="w-3/4 grid grid-cols-3">
          {pendingOrders.length > 1 ? (
            pendingOrders.map((order) => {
              return (
                <RequestCardFull store={store} order={order} id={order._id} />
              );
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
          {ibtReadyOrders.length > 1 ? (
            ibtReadyOrders.map((order) => {
              return (
                <RequestCardFull store={store} order={order} id={order._id} />
              );
            })
          ) : (
            <div>There are no todos for you!</div>
          )}
        </div>
      </div>
      <div className="flex">
        <h2 className="w-1/4">All CNCs ({allOrders.length})</h2>
        <div className="w-3/4 grid grid-cols-3">
          {allOrders.length > 1 ? (
            allOrders.map((order) => {
              return (
                <RequestCardFull store={store} order={order} id={order._id} />
              );
            })
          ) : (
            <div>There are no todos for you!</div>
          )}
        </div>
      </div>
    </div>
  );
};
