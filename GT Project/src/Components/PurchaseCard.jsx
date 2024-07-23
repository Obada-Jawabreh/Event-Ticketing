// src/Components/PurchaseCard.jsx
import React from 'react';

const PurchaseCard = ({ event, price, tickets }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-4">
      <h3 className="text-white text-xl font-bold mb-2">Purchase Details</h3>
      <div className="text-white mb-2">
        <p><strong>Event ID:</strong> {event}</p>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Tickets:</strong> {tickets}</p>
      </div>
    </div>
  );
};

export default PurchaseCard;


