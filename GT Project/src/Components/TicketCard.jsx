// Components/TicketCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainButton from './Buttons/MainButton';

const TicketCard = ({ name, startDate, endDate, price, eventId, img }) => {
  const navigate = useNavigate();

  const handleSelectTicket = (ticketId) => {
    localStorage.setItem("user", JSON.stringify(ticketId));
    navigate("details");
  };

  return (
    <div
      id="card"
      className="bg-second-dark rounded-2xl flex p-6 flex-col items-center gap-3 justify-between"
    >
      <div>
        <div id="img">
          <img
            src={img}
            alt="Event"
            className="rounded-lg"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div id="content" className="flex flex-col gap-1">
          <h6
            id="name"
            className="self-stretch text-cyan-50 font-medium font-sans "
          >
            {name}
          </h6>
          <p id="date" className="text-sm text-slate-500 font-semibold">
            Start: {startDate}
            <br />
            End: {endDate}
          </p>
          <p id="price" className="text-sm text-slate-500 font-semibold">
            {price}
          </p>
        </div>
      </div>

      <div id="btn" className="flex self-stretch w-full">
        <MainButton
          id={eventId}
          className="flex self-stretch w-full"
          onClick={() => handleSelectTicket(eventId)}
        >
          Select Ticket
        </MainButton>
      </div>
    </div>
  );
};

export default TicketCard;