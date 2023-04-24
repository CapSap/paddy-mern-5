import { useState } from "react";

export const Entry = () => {
  const [orderNumber, setOrderNumber] = useState<string>();
  const [customerName, setCustomerName] = useState<string>();
  const [pickupLocation, setPickupLocation] = useState();
  const [notes, setNotes] = useState();

  const [orderedItems, setOrderedItems] = useState([]);

  function handleChange(e) {
    console.log(e);
  }

  function handleOrderedItemsChange(e, index: number) {
    console.log(e, index);
  }

  function onFormSubmit(e) {}

  return (
    <>
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div className="mb-10 md:mb-16">
          <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-6">
            Make requests below
          </h2>
          <p className="max-w-screen-md text-gray-500 md:text-lg text-center mx-auto">
            Below is a form that will send a request to stores for CNC orders.
            Feedback is welcome
          </p>
        </div>
        <form
          method="POST"
          action="/"
          onSubmit={(e) => onFormSubmit(e)}
          className="max-w-screen-md grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto"
        >
          <div>
            <label
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
              htmlFor="orderNumber"
            >
              Order Number:{" "}
            </label>
            <input
              required={true}
              type="text"
              name="orderNumber"
              id="orderNumber"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className=" w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
            />
          </div>
          <div>
            <label
              htmlFor="customerName"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Customer Name:{" "}
            </label>
            <input
              required={true}
              type="text"
              name="customerName"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
            />
          </div>
          <div>
            <label
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
              htmlFor="pickupLocation"
            >
              Pickup Location:{" "}
            </label>
            <select
              required={true}
              id="pickupLocation"
              onChange={(e) => {
                handleChange(e);
              }}
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
            >
              <option disabled value="">
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
            </select>{" "}
          </div>
          <div>
            <label
              htmlFor="fourHour"
              className="text-gray-800 text-sm sm:text-base "
            >
              4 Hour:
            </label>
            <div className="mt-4 space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="fourHour"
                    name="fourHour"
                    type="checkbox"
                    onChange={(e) => handleChange(e)}
                    className="ml-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                  ></input>
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="fourHour"
                    className="font-medium text-gray-700"
                  >
                    Check this if the customer is expecting order to be ready
                    within 4 hours.
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="notes"
              className="inline-block text-gray-800 text-sm sm:text-base mb-2"
            >
              Notes:{" "}
            </label>
            <textarea
              type="text"
              name="notes"
              id="notes"
              onChange={(e) => handleChange(e)}
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
            ></textarea>
          </div>
          <div className="md:col-span-2 bg-slate-300 flex flex-col justify-center items-center">
            {" "}
            <p>Make multiple requests: </p>
            <button
              type="button"
              onClick={(e) => handleClick(e)}
              className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
            >
              {" "}
              Get more requests
            </button>
          </div>
          <p className="max-w-screen-md md:col-span-2 text-gray-500 md:text-lg text-center mx-auto">
            Make a request for each sku on the order
          </p>
          <button
            className="md:col-span-2 inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
            type="submit"
          >
            Send order/request to store
          </button>
        </form>
      </div>
    </>
  );
};
