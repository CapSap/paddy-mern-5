import React, { FormEvent, useState } from "react";
import { StoreLocation, Request, Order } from "../Types";
import { NavBar } from "./NavBar";

export const Entry = () => {
  const [orderNumber, setOrderNumber] = useState<string>();
  const [orderNumberDirty, setOrderNumberDirty] = useState(false);
  const [customerName, setCustomerName] = useState<string>();
  const [pickupLocation, setPickupLocation] = useState<StoreLocation>();
  const [notes, setNotes] = useState<string>();
  const [isFourHour, setFourHour] = useState(false);

  const [orderedItems, setOrderedItems] = useState<Request[]>([
    {
      items: undefined,
      sendingStore: undefined,
      requestStatus: "created",
      tracking: undefined,
      ibt: undefined,
      isIbtAccepeted: false,
    },
  ]);

  function handleGetMoreRequests() {
    setOrderedItems((prevState) => {
      return [
        ...prevState,
        {
          items: undefined,
          sendingStore: undefined,
          requestStatus: "created",
          tracking: undefined,
          ibt: undefined,
          isIbtAccepeted: false,
        },
      ];
    });
  }

  function handleOrderedItemsChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) {
    setOrderedItems((prevState) => {
      const updatedRequest = {
        ...prevState[index],
        [e.target.name]: e.target.value,
      };

      return [
        ...prevState.slice(0, index),
        updatedRequest,
        ...prevState.slice(index + 1),
      ];
    });
  }
  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      orderNumber === undefined ||
      customerName === undefined ||
      pickupLocation === undefined
    ) {
      return new Error("invalid info");
    }
    const payload: Order = {
      orderNumber: orderNumber,
      customerName: customerName,
      pickupLocation: pickupLocation,
      notes: notes,
      isArchived: false,
      isFourHour: isFourHour,
      orderedItems: orderedItems,
      hasIssue: false,
    };

    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("API error");
    }
    console.log(response);
  }

  async function getAllOrders() {
    const response = await fetch("http://localhost:3000/orders");
    console.log(await response.json());
  }

  return (
    <>
      <NavBar currentPage={"entry"} />

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
          onSubmit={(e) => handleFormSubmit(e)}
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
              onChange={(e) => {
                setOrderNumber(e.target.value);
              }}
              onFocus={() => setOrderNumberDirty(true)}
              className=" w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
            />

            {!orderNumber && orderNumberDirty ? (
              <p>Please enter an order number</p>
            ) : null}
            {orderNumber?.length != 10 && orderNumberDirty ? (
              <p>Order number might be missing a digit</p>
            ) : null}
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
              value={"test"}
              onChange={(e) => {
                // const value: StoreLocation = e.target.value;
                setPickupLocation(e.target.value);
              }}
              // onChange={(e) => {
              //   if (
              //     e.target.value === "Canberra" ||
              //     e.target.value === "Fortitude Valley"
              //   ) {
              //     const value: StoreLocation = e.target.value;
              //     setPickupLocation(e.target.value);
              //   }
              // }}
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
              defaultValue={"default"}
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
                    onChange={(e) => setFourHour((prev) => !prev)}
                    checked={isFourHour}
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
              name="notes"
              id="notes"
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
              className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
            ></textarea>
          </div>
          <div className="md:col-span-2 bg-slate-300 flex flex-col justify-center items-center">
            {" "}
            <p>Make multiple requests: </p>
            <button
              type="button"
              onClick={() => handleGetMoreRequests()}
              className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
            >
              {" "}
              Get more requests
            </button>
          </div>
          <p className="max-w-screen-md md:col-span-2 text-gray-500 md:text-lg text-center mx-auto">
            Make a request for each sku on the order
          </p>

          {orderedItems.map((request, index) => {
            return (
              <div key={index + 1}>
                <p>Request #{index + 1}</p>
                <div>
                  <label
                    className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                    htmlFor="items"
                  >
                    Item(s):{" "}
                  </label>
                  <textarea
                    required={true}
                    className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                    id={"items" + index}
                    name="items"
                    key={"items" + index}
                    value={request.items}
                    onChange={(e) => {
                      handleOrderedItemsChange(e, index);
                    }}
                  />
                </div>
                <div>
                  <label
                    className="inline-block text-gray-800 text-sm sm:text-base mb-2"
                    htmlFor="sendingStore"
                  >
                    Sending Store:{" "}
                  </label>
                  <select
                    className="w-full bg-gray-50 text-gray-800 border focus:ring ring-indigo-300 rounded outline-none transition duration-100 px-3 py-2"
                    id={"sendingStore" + index}
                    name="sendingStore"
                    key={"sendingStore" + index}
                    value={request.sendingStore}
                    onChange={(e) => {
                      handleOrderedItemsChange(e, index);
                    }}
                    defaultValue={"default"}
                  >
                    <option value={"default"} disabled={true}>
                      Please choose an option
                    </option>

                    <option value="Canberra">Canberra - 213</option>
                    <option value="Fortitude Valley">
                      Fortitude Valley - 416
                    </option>
                    <option value="Hobart">Hobart - 710</option>
                    <option value="Melbourne">Melbourne - 314</option>
                    <option value="Seven Hills">Seven Hills - 208</option>
                    <option value="Perth">Perth - 615</option>
                    <option value="Ringwood">Ringwood - 319</option>
                    <option value="Sydney">Sydney - 210</option>
                  </select>
                </div>
              </div>
            );
          })}
          <div className="md:col-span-2 flex flex-col justify-center items-center">
            <button
              type="submit"
              className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
            >
              Submit order/request to store
            </button>
          </div>
        </form>
        <button
          onClick={() => getAllOrders()}
          className="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
        >
          get orders
        </button>
      </div>
    </>
  );
};
