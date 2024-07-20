import { Carousel } from "flowbite-react";
import hero from '../images/1.png';
import hero2 from '../images/2.png';
import hero3 from '../images/3.png';
import TicketCard from "../Components/TicketCard";
import SpecialOfferCard from "../Components/SpecialOfferCard"; // Import the new component
import FetchEvents from "../Hooks/getEvents";
import { dbURL } from "../FirebaseConfig/Config";
import { Accordion } from "flowbite-react";
export default function HomeComponent() {
  const [events] = FetchEvents(dbURL);

  // Sample data for additional cards (you can replace this with real data or adjust as needed)
  const additionalCards = [
    {
      title: "Special Event 1",
      description: "Join us for a special event featuring unique activities.",
      image: "https://firebasestorage.googleapis.com/v0/b/project-4-bbf17.appspot.com/o/Apex%20Legends%2F1340730.jpeg?alt=media&token=2a257251-0585-4bb6-af4e-41fe4c824a28",
      previous_price: '100$',
      current_price: '70$',
    },
    {
      title: "Special Event 2",
      description: "Don’t miss out on this exclusive opportunity.",
      image: "https://firebasestorage.googleapis.com/v0/b/project-4-bbf17.appspot.com/o/Magic%3A%20The%20Gathering%2F1305445.jpg?alt=media&token=c7dcd886-979b-4d8f-8e2a-2cd5df55bfe8",
      previous_price: '180$',
      current_price: '75$',
    },
    {
      title: "Special Event 3",
      description: "Experience something extraordinary with us.",
      image: "https://firebasestorage.googleapis.com/v0/b/project-4-bbf17.appspot.com/o/Smash%20World%20Tour%2Fsmash-world-tour_feature.jpg?alt=media&token=3bf7da7e-199a-4135-9644-1ca7a2d71095",
      previous_price: '200$',
      current_price: '100$',
    }
  ];
  return (
    <div className="min-h-screen max-w-7xl ml-24 mr-24 mb-12 overflow-y-auto flex flex-col mt-10">
      <Carousel className="h-full rounded-xl flex-grow h-[400px]">
        <img src={hero} alt="..." className="rounded-xl" />
        <img src={hero2} alt="..." className="rounded-xl" />
        <img src={hero3} alt="..." className="rounded-xl" />
      </Carousel>
      
      <h2 className="text-2xl font-bold mt-12 text-white">Currently Trending Games</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {events.slice(0, 3).map((event) => (
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

      <h2 className="text-2xl font-bold mt-12 text-white">Special Offers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {additionalCards.map((card, index) => (
          <SpecialOfferCard
            key={index}
            title={card.title}
            description={card.description}
            image={card.image}
            previous_price={card.previous_price}
            current_price={card.current_price}
          />
        ))}
      </div>
      <div className=' flex justify-center mt-10   m-auto mb-3 border-blk ' >
    <Accordion className='ms-70 mt-4   self-center text-white bg-second-dark' style={{width:'1266px'}}>
        <h1 className='text-left font-bold text-2xl ml-5 mb-4 mt-4 '>FAQ's</h1>
      <Accordion.Panel className='border-black focus:ring-transparent bg-blk '>
        <Accordion.Title className='text-white bg-blk text-sm  hover:bg-blk focus:ring-transparent '>What is Gtickets?</Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-white text-sm">
            Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons,
            dropdowns, modals, navbars, and more.
          </p>
          <p className="text-white text-sm">
            Check out this guide to learn how to&nbsp;
            <a
              href="https://flowbite.com/docs/getting-started/introduction/"
              className="text-cyan-600 hover:underline dark:text-cyan-500"
            >
              get started&nbsp;
            </a>
            and start developing websites even faster with components on top of Tailwind CSS.
          </p>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel className='border-black focus:ring-transparent'>
        <Accordion.Title className='text-white text-sm bg-blk hover:bg-blk focus:ring-transparent  '>Is there a Figma file available?</Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-white text-sm">
            Flowbite is first conceptualized and designed using the Figma software so everything you see in the library
            has a design equivalent in our Figma file.
          </p>
          <p className="text-white text-sm">
            Check out the
            <a href="https://flowbite.com/figma/" className="text-cyan-600 hover:underline dark:text-cyan-500">
              Figma design system
            </a>
            based on the utility classes from Tailwind CSS and components from Flowbite.
          </p>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel className='border-black focus:ring-transparent'>
        <Accordion.Title className='text-white bg-blk text-sm  hover:bg-light focus:ring-transparent '>What are the differences between Flowbite and Tailwind UI?</Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-white text-sm">
            The main difference is that the core components from Flowbite are open source under the MIT license, whereas
            Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone
            components, whereas Tailwind UI offers sections of pages.
          </p>
          <p className="mb-2 text-white text-sm">
            However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no
            technical reason stopping you from using the best of two worlds.
          </p>
          <p className="mb-2 text-white text-sm">Learn more about these technologies:</p>
          <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
            <li>
              <a href="https://flowbite.com/pro/" className="text-cyan-600 hover:underline dark:text-cyan-500">
                Flowbite Pro
              </a>
            </li>
            <li>
              <a
                href="https://tailwindui.com/"
                rel="nofollow"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Tailwind UI
              </a>
            </li>
          </ul>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel className='border-black focus:ring-transparent' >
        <Accordion.Title className='text-white text-sm bg-blk hover:bg-light focus:ring-transparent '>What is Flowbite?</Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-white text-sm">
            Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons,
            dropdowns, modals, navbars, and more.
          </p>
          <p className="text-white text-sm">
            Check out this guide to learn how to&nbsp;
            <a
              href="https://flowbite.com/docs/getting-started/introduction/"
              className="text-cyan-600 hover:underline dark:text-cyan-500"
            >
              get started&nbsp;
            </a>
            and start developing websites even faster with components on top of Tailwind CSS.
          </p>
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
    </div>
 
    </div>
  );
}
