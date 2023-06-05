export const RequestCard = ({ request }) => {
  return (
    <div className="border-cyan-100 border-8 m-3">
      <p>Order Number / reference: {request.orderNumber}</p>
      <p>name: {request.customerName}</p>
      <p>Items: {request.orderedItems[0].items}</p>
      <p>Message: {request.orderedItems[0].message}</p>
      <p>Destination Store: {request.pickupLocation}</p>
    </div>
  );
};
