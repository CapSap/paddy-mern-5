export const RequestCard = ({ request }) => {
  console.log(request);
  return (
    <div className="border-cyan-100 border-8">
      <p>Order Number / reference {request.orderNumber}</p>
      <p>name {request.customerName}</p>
      <p>Items {request.orderedItems[0].items}</p>
    </div>
  );
};
