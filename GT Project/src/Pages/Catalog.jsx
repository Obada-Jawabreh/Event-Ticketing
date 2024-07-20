import SearchInput from "../Components/SearchInput";
import { dbURL } from "../FirebaseConfig/Config";
import FetchEvents from "./../Hooks/getEvents.jsx";
import { useState } from "react";
import TicketCard from "../Components/TicketCard.jsx";

function Catalog() {
  // feach events data from firebase
  const [events] = FetchEvents(dbURL);

  //search
  const [search, setSearch] = useState("");

  //pagination
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
          <SearchInput
            className="w-full"
            placeholder="search"
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4 gap-6">
          {currentEvents
            .filter((val) => {
              if (search == "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(search.toLocaleLowerCase())
              ) {
                return val;
              }
            })
            .map((event) => (
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
                  ? "bg-custom-red text-white hover:bg-custom-red-hover"
                  : "bg-second-dark text-white hover:bg-ter-dark"
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

export default Catalog;
