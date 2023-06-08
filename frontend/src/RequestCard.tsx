import { OrderInfoFromDB } from "./Types";

export const RequestCard = ({
  order,
  id,
}: {
  order: OrderInfoFromDB;
  id: string;
}) => {
  return (
    <div
      className="flex basis-96 flex-shrink-0 grow border-cyan-100 border-8 m-3 p-3"
      id={id}
    >
      <div>
        <p>Order Number / reference: {order.orderNumber}</p>
        <p>name: {order.customerName}</p>
        {order.orderedItems[0].message ? (
          <p>Message: {order.orderedItems[0].message}</p>
        ) : null}
        <p className="font-bold">Destination Store: {order.pickupLocation}</p>
        <p>Status: {order.orderedItems[0].requestStatus}</p>

        <a href="#">Link to magento order</a>
      </div>
      <div className="flex-grow  text-center">
        {order.orderedItems.map((request) => {
          return (
            <div>
              <p>{request.items}</p>
            </div>
          );
        })}
        <p className="font-bold">Items: {order.orderedItems[0].items}</p>
      </div>
    </div>
  );
};
