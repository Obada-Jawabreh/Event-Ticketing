import SearchInput from "../Components/SearchInput";
import MainButton from "../Components/Buttons/MainButton";
import { dbURL } from "../FirebaseConfig/Config";
import FetchEvents from "./../Hooks/getEvents.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Catalog() {
  const [events] = FetchEvents(dbURL);
  // const [search, setSearch] = useState;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const indexOfLastEvent = currentPage * itemsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - itemsPerPage;
  const currentEvents = events
    ? events.slice(indexOfFirstEvent, indexOfLastEvent)
    : [];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = events ? Math.ceil(events.length / itemsPerPage) : 0;

  return (
    <>
      <div className="bg-prim-dark pt-12 mx-8 sm:mx-8 lg:mx-12 xl:mx-24 mb-40">
        <div
          id="SearchBar"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4 gap-6 py-6"
        >
          <SearchInput className="w-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4 gap-6">
          {currentEvents.map((event) => (
            <TicketCard
              key={event.id}
              name={event.name}
              startDate={event.startDate}
              endDate={event.endDate}
              price={event.price}
              eventId={event.id}
              img={event.image}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center py-16 ">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-2 px-4 py-2 rounded ${
                currentPage === index + 1
                  ? "bg-custom-red text-white"
                  : "bg-second-dark text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

// eslint-disable-next-line react/prop-types
function TicketCard({ name, startDate, endDate, price, eventId, img }) {
  // const [currentUser, setCurrentUser] = useState();
  // useEffect(() => {}, [currentUser]);

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
      <div className="">
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
            Start : {startDate}
            <br />
            End : {endDate}
          </p>
          <p id="price" className="text-sm text-slate-500 font-semibold">
            {price}
          </p>
        </div>
      </div>

      <div id="btn" className="flex self-stretch w-full ">
        {/* <Link
          to="details"
          className="w-100% flex self-stretch w-fill-available"
        > */}
        <MainButton
          id={eventId}
          className="flex  self-stretch w-fill-available"
          onClick={() => handleSelectTicket(eventId)}
        >
          Select Ticket
        </MainButton>
        {/* </Link> */}
      </div>
    </div>
  );
}

export default Catalog;
