import React, { useState, useEffect } from "react";
import ConfirmationPopup from "./Confirm";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { jsPDF } from "jspdf";
import { dbURL } from "../FirebaseConfig/Config";

function Checkout() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [eventDetail, setEventDetail] = useState(null);
  const initialOptions = {
    "client-id":
      "AWrR0dEDBlc9AVYB7E-RbYM8HyZMGiRs_ibLN1lcJXBnv8DhZc1BuvhagRX5ycmsDSNQ3B5TxKya81_v",
    "enable-funding": "card",
    "disable-funding": "",
    "data-sdk-integration-source": "integrationbuilder_sc",
  };
  let tuser = localStorage.getItem("user");
  let tevent = parseInt(localStorage.getItem("Event id"));
  let tcount = parseInt(localStorage.getItem("count tickets"));
  let tprice = localStorage.getItem("price tickets");
  let talltikets = parseInt(localStorage.getItem("all count tickets"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${dbURL}/Events/${tevent}.json`);
        setEventDetail(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [tevent]);

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsPopupOpen(true);
  };

  const handleConfirm = (e) => {
    e.preventDefault();

    setIsPopupOpen(false);
  };

  const handlePaymentUpload = async (orderDetails) => {
    const newid = `${tuser}`;
    const tikets = tcount - talltikets;
    console.log(tikets);
    const paymentData = {
      user: tuser,
      event: tevent,
      tickets: tcount,
      price: tprice,
      orderDetails,
    };
    try {
      await axios.put(`${dbURL}/Purchases/${newid}.json`, paymentData);
      await axios.put(`${dbURL}/Events/${tevent}/numTickets.json`, tikets);
    } catch (err) {
      console.error("Error uploading payment data:", err);
    }
  };

  const generatePDF = (orderDetails) => {
    const doc = new jsPDF();
    doc.text("Invoice", 10, 10);
    doc.text(`Name: ${tuser}`, 10, 20);
    doc.text(`Event: ${eventDetail ? eventDetail.name : "Loading..."}`, 10, 30);
    doc.text(`Tickets: ${tcount}`, 10, 40);
    doc.text(`Price: $${tprice}`, 10, 50);
    doc.text(`Order ID: ${orderDetails.id}`, 10, 60);
    doc.save("invoice.pdf");
  };

  return (
    <div className="bg-gray-900 text-white p-4 md:p-8 flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
        {eventDetail ? (
          <div className="bg-gray-800 rounded-lg p-4 mb-4 ">
            <img
              src={eventDetail.image}
              alt="Event"
              className="w-full h-30 rounded mr-4 mb-4 sm:mb-0"
            />
            <div className="flex-grow mb-4 sm:mb-0 text-center sm:text-left">
              <h3 className="font-bold">{eventDetail.name}</h3>
            </div>
            <div className="flex items-center">
              <span className="mx-2">tickets num: {tcount} </span>
            </div>
            <span className="ml-4">price :${tprice}</span>
          </div>
        ) : (
          <p>Loading event details...</p>
        )}
      </div>
      <div className="w-full md:w-1/2 bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Let's Make Payment</h2>
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Or Pay with PayPal</h2>
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              style={{ layout: "horizontal", shape: "rect" }}
              createOrder={(data, actions) => {
                console.log("Creating order...");
                return actions.order
                  .create({
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        description: eventDetail ? eventDetail.name : "Event",
                        amount: {
                          currency_code: "USD",
                          value: tprice,
                        },
                      },
                    ],
                  })
                  .then((orderID) => {
                    console.log("Order created:", orderID);
                    return orderID;
                  })
                  .catch((err) => {
                    console.error("Error creating order:", err);
                  });
              }}
              onApprove={(data, actions) => {
                console.log("Order approved:", data);
                return actions.order
                  .capture()
                  .then((details) => {
                    console.log("Order details:", details);
                    alert(
                      `Transaction completed by ${details.payer.name.given_name}`
                    );
                    handlePaymentUpload(details);
                    generatePDF(details);
                  })
                  .catch((err) => {
                    console.error("Error capturing order:", err);
                  });
              }}
              onError={(err) => {
                console.error("Error creating PayPal order:", err);
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>
      <ConfirmationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

export default Checkout;
