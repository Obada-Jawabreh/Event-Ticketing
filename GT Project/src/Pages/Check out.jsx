import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { jsPDF } from "jspdf";
import { dbURL } from "../FirebaseConfig/Config";

function Checkout() {
  const [eventDetail, setEventDetail] = useState(null);
  const [coupons, setCoupons] = useState({});
  const [couponInput, setCouponInput] = useState("");
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(
    parseFloat(localStorage.getItem("price tickets"))
  );

  const initialOptions = {
    "client-id":
      "AWrR0dEDBlc9AVYB7E-RbYM8HyZMGiRs_ibLN1lcJXBnv8DhZc1BuvhagRX5ycmsDSNQ3B5TxKya81_v",
    "enable-funding": "card",
    "disable-funding": "",
    "data-sdk-integration-source": "integrationbuilder_sc",
  };

  let tuser = JSON.parse(localStorage.getItem("user"));
  let tevent = parseInt(localStorage.getItem("Event id"));
  let tcount = localStorage.getItem("count tickets");
  let ttcount = parseInt(tcount);
  let tprice = parseFloat(localStorage.getItem("price tickets"));
  let talltikets = localStorage.getItem("all count tickets");
  let ttalltikets = parseInt(talltikets);
  let count = 0;

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

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(`${dbURL}/coupons.json`);
        setCoupons(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCoupons();
  }, []);

  const handleApplyCoupon = () => {
    const coupon = coupons[couponInput];
    if (coupon && !coupon.is_deleted) {
      const discountValue = parseFloat(coupon.discount) / 100;
      const discountAmount = tprice * discountValue;
      setDiscount(discountAmount);
      setFinalPrice(tprice - discountAmount);
      localStorage.setItem("finalPrice", tprice - discountAmount);
      console.log(
        `Applied coupon: ${couponInput}, Discount: ${discountAmount}, Final Price: ${
          tprice - discountAmount
        }`
      );
    } else {
      alert("Invalid or expired coupon code.");
      setDiscount(0);
      setFinalPrice(tprice);
      localStorage.setItem("finalPrice", tprice);
      console.log(`Invalid coupon: ${couponInput}, No discount applied.`);
    }
  };

  const handlePaymentUpload = async (orderDetails) => {
    const tikets = ttalltikets - tcount;
    const paymentData = {
      user: tuser,
      event: tevent,
      tickets: ttcount,
      price: finalPrice,
      orderDetails,
    };
    try {
      await axios.patch(
        `${dbURL}/users/${tuser}/Purchases/${count++}.json`,
        paymentData
      );
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
    doc.text(`Price: $${finalPrice}`, 10, 50);
    doc.text(`Order ID: ${orderDetails.id}`, 10, 60);
    doc.save("invoice.pdf");
  };

  return (
    <div className="bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

        {eventDetail ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <img
                src={eventDetail.image}
                alt="Event"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h2 className="text-2xl font-bold mb-4">{eventDetail.name}</h2>
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg">Tickets:</span>
                <span className="text-lg font-bold">{tcount}</span>
              </div>
              <hr className="border-gray-700 mb-4" />
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>$ {tprice}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Discount & Offers</span>
                <span>$ {discount}</span>
              </div>
              <div className="flex justify-between text-xl font-bold mt-4">
                <span className="text-purple-400">Total</span>
                <span>$ {finalPrice}</span>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Payment Details</h2>

              <div className="mb-6">
                <label className="block text-sm mb-2">Discount Code</label>
                <div className="flex">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-grow bg-gray-700 rounded-l p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-purple-600 text-white px-6 rounded-r hover:bg-purple-700 transition duration-300"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">Pay with PayPal</h3>
              <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                  style={{ layout: "vertical", shape: "rect" }}
                  createOrder={(data, actions) => {
                    const storedFinalPrice = localStorage.getItem("finalPrice");
                    console.log(
                      "Creating order with final price:",
                      storedFinalPrice
                    );
                    return actions.order
                      .create({
                        intent: "CAPTURE",
                        purchase_units: [
                          {
                            description: eventDetail
                              ? eventDetail.name
                              : "Event",
                            amount: {
                              currency_code: "USD",
                              value: storedFinalPrice,
                            },
                          },
                        ],
                      })
                      .then((orderID) => {
                        return orderID;
                      })
                      .catch((err) => {
                        console.error("Error creating order:", err);
                      });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order
                      .capture()
                      .then((details) => {
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
        ) : (
          <p className="text-center text-xl">Loading event details...</p>
        )}
      </div>
    </div>
  );
}

export default Checkout;
