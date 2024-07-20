import { dbURL } from "../FirebaseConfig/Config";
import FetchEventById from "../Hooks/getEventByID";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate  } from "react-router-dom";
const EventDetails = () => {
  let [masseage , setMassage]=useState("");
  const navigate=useNavigate()
  const eventId = JSON.parse(localStorage.getItem("Event id"));
  console.log("the id ", eventId);

  const [event, setEvent] = useState({});
  console.log(event);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${dbURL}/Events/${eventId}.json`);
        const eventData = response.data;

        console.log("Fetched event data: ", eventData);

        if (eventData) {
          setEvent(eventData);
        } else {
          console.log(`No data found for event with ID: ${eventId}`);
        }
      } catch (error) {
        console.error(
          `Error fetching data for event with ID: ${eventId}`,
          error
        );
      }
    };

    if (eventId !== null) {
      fetchEvent();
    }
  }, [eventId]);

  const [count, setCount] = useState(0);
  const ticketPrice = event.price;
  const totalPrice = count * ticketPrice;

  const handleIncrease = () => {
    if(count<event.numTickets)
    setCount(count + 1);
  };

  const handleDecrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handelSelect=()=>{
    if(count>0 ){
    localStorage.setItem("count tickets", JSON.stringify(count));
    localStorage.setItem("price tickets", JSON.stringify(totalPrice));

    navigate('/checkout')
  }
    else if(event.numTickets){
      setMassage('Please select the number of tickets');
    }
    else
    setMassage('Sorry, the number of available tickets has sold out');


  }

  if (!event) return <p>Loading...</p>;

  return (
    <>
      <div className="min-h-screen bg-[#221B2C] text-white ">
        <main className="p-8 ">
          <div className="bg-card rounded-lg p-8 ">
            <img
              src={event.image}
              alt="Event Banner"
              className="w-2/4 h-100 object-cover rounded-lg"
            />
          </div>
          <h1 className="text-2xl ml-7 font-bold mb-12">{event.name}</h1>
          <div className="flex flex-col lg:flex-row justify-between items-start">
            <p className="text-white text-opacity-50 ml-7 mb-8 w-full lg:w-2/3">
              {event.description}
            </p>

            {/* card details */}
            <div className="grid-cols-1 grid-rows-2 w-full lg:w-96 mr-8">
            <div className="bg-[#1a1a2e] text-white p-6 lg:ml-7 mb-8 lg:mb-0 h-auto rounded-lg border-2 border-[#ff0055] w-full lg:w-96">
              <div className="flex items-center mb-2">
               { event.numTickets ? <span className="text-zinc-400">
                  Available: {event.numTickets} </span>: <span className="text-red-400">
                  Sold out   
                
                </span>}
              </div>
              <hr className="border-zinc-500 mb-4" />
              <div className="flex justify-between items-center">
                <span className="text-2xl font-semibold">{event.price} JD</span>
                <button
                  className="bg-[#ff0055] text-white py-2 px-4 rounded-lg hover:bg-[#ff0055]/80"
                  onClick={handelSelect}
                >
                  Select Ticket
                </button>
              </div>

              <div className="flex items-center mt-4">
                <div className="flex items-center">
                  <button
                    onClick={handleDecrease}
                    className="text-white bg-[#ff0055] px-2 py-1 rounded-l-lg"
                  >
                    -
                  </button>
                  <span className="mx-4 text-lg">{count}</span>
                  <button
                    onClick={handleIncrease}
                    className="text-white bg-[#ff0055] px-2 py-1 rounded-r-lg"
                  >
                    +
                  </button>
                </div>
                <span className="text-lg mx-8">{totalPrice} JD</span>
              </div>

              <hr className="border-zinc-500 mb-4 mt-9" />
              <div className="flex items-center mb-2">
                <img
                  aria-hidden="true"
                  alt="calendar-icon"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAMBJREFUSEtjZKAxYKSx+Qx4LfjPy/sf5ADGz5+xqiMkD9aLzweEDCAkj2HBf15efwYGhg4GBgYNMoPuOgMjYwnjp0/bYPpRfPCfl/cJAwODNJmGw7TdY/z8WRmXBeAwpxQgxxm6D+hjAa5UQ8hn2CIdqw+GjwXoXiaVjy0foORcUg0cjQMGUoNsNA4wMvYgSEU8PA8ZGBnlCJU5BOQfMH7+rIiruAZVOJ0MDAzqZFpyiYGRsRJnhUOmoXi10bxVAQDOUr4ZXgKLyQAAAABJRU5ErkJggg=="
                  className="mr-2 "
                />
                <span className="text-zinc-400">
                  Start Date : {event.startDate}
                </span>
              </div>
              <span className="text-zinc-400 ml-8">
                End Date : {event.endDate}
              </span>
            </div>
            <p  className="p-6	lg:ml-7 mb-8 text-lg	">{masseage}</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default EventDetails;
