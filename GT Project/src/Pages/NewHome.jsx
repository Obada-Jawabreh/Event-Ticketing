import heroImg from "../images/heroImg.png";
import cta from "../images/cta.png";
import hero4 from "../images/4.png";

import MainButton from "../Components/Buttons/MainButton";
import { useState } from "react";
// import hero3 from "../images/3.png";

function Home() {
  return (
    <div className="flex flex-col gap-10  mx-8 sm:mx-8 lg:mx-12 xl:mx-24">
      <Hero />
      <Featuers />
      <CTA />
      <aboutUs />
    </div>
  );
}

function Hero() {
  return (
    <div
      id="hero-container"
      className=" relative grid grid-cols-1 md:grid-cols-2 justify-center content-center "
    >
      <div
        id="gradiant"
        className="absolute top-0 left-0 right-0 w-80 md:w-96 h-96 shrink-0 rounded-full blur-3xl  bg-indigo-800  "
      ></div>
      <div
        id="gradiant"
        className="absolute bottom-0 right-100 w-80 md:w-96 h-96 shrink-0 rounded-full blur-3xl bg-none  sm:bg-pink-500"
      ></div>
      <div id="img" className="relative z-10">
        <img src={heroImg} />
      </div>
      <div
        id="content"
        className=" content-center justify-center relative z-10 "
      >
        <div id="text" className=" flex flex-col gap-6">
          <p className="text-text-prim  font-sans font-bold text-3xl md:text-7xl ">
            Experience the Ultimate eGaming Events Live!
          </p>
          <p className="text-text-second font-sans font-medium text-lg md:text-xl text-justify">
            Get your tickets for the most exciting tournaments and gaming
            conventions around the world.
          </p>
          <div id="btns" className="w-1/2">
            <MainButton className="font-sans">Explore Now</MainButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function Featuers() {
  const [featuersList, setFeatuersList] = useState({
    featuers: [
      {
        featuer: "  Wide Range of Events",
        description:
          "Access tickets to the hottest eGaming events worldwide, from major tournaments to local gaming conventions",
      },
      {
        featuer: "Easy and Secure Ticket Purchasing ",
        description:
          "Enjoy a seamless and secure ticket buying experience with multiple payment options.",
      },
      {
        featuer: "Exclusive Offers and Discounts",
        description:
          "Take advantage of special promotions, early bird discounts, and group rates.",
      },
      {
        featuer: "  Event Location in Map",
        description:
          " Easily find the event venue with interactive maps showing the location ",
      },
    ],
  });
  return (
    <div className="pt-12">
      <div id="featuers-Hiding">
        <p className="font-sans text-text-prim font-bold text-2xl">
          Featuers For You
        </p>
      </div>
      <div
        id="featuers-list"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4 gap-6 py-6"
      >
        {featuersList.featuers.map((featuer) => (
          <FeatuerCard
            key={featuer.id}
            featuer={featuer.featuer}
            description={featuer.description}
          />
        ))}
      </div>
    </div>
  );
  // return (
  //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4 gap-6 py-6"></div>
  // );
}

function FeatuerCard({ featuer, description }) {
  return (
    <div>
      <div
        id="card"
        className=" h-full relative z-10 bg-gradient-prim rounded-2xl flex p-7 flex-col items-center gap-4 justify-between font-sans text-start align-start "
      >
        <div className="w-full">
          <p id="featuer" className="text-purple-300  text-lg bold font-bold">
            {featuer}
          </p>
        </div>
        <div>
          <p
            id="description"
            className="text-text-second text-start font-medium text-base"
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function aboutUs() {
  return (
    <section className="py-6 dark:bg-gray-100 text-white mt-20">
      <div className="container flex flex-col items-center justify-center p-4 mx-auto space-y-8 sm:p-10">
        <h1 className="text-4xl font-bold leading-none text-center sm:text-5xl">
          Meet Our team
        </h1>
        <p className="max-w-2xl text-center dark:text-gray-600">
          Skilled developers crafting seamless ticketing experiences for gaming
          enthusiasts.
        </p>
        <div className="flex flex-row flex-nowrap justify-center overflow-auto">
          <div className="flex flex-col justify-center m-4 text-center">
            <img
              alt=""
              className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
              src={hero4}
            />
            <p className="text-xl font-semibold leading-tight">
              Obada Jawabreh
            </p>
            <p className="dark:text-gray-600">Scrum Master</p>
          </div>
          <div className="flex flex-col justify-center m-4 text-center">
            <img
              alt=""
              className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
              src={hero4}
            />
            <p className="text-xl font-semibold leading-tight">Noor Atallah</p>
            <p className="dark:text-gray-600">Product Owner</p>
          </div>
          <div className="flex flex-col justify-center m-4 text-center">
            <img
              alt=""
              className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
              src={hero4}
            />
            <p className="text-xl font-semibold leading-tight">
              Abd-alrahman Mnasour
            </p>
            <p className="dark:text-gray-600">QA</p>
          </div>
          <div className="flex flex-col justify-center m-4 text-center">
            <img
              alt=""
              className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
              src={hero4}
            />
            <p className="text-xl font-semibold leading-tight">Alaa Ata</p>
            <p className="dark:text-gray-600">Developer</p>
          </div>
          <div className="flex flex-col justify-center m-4 text-center">
            <img
              alt=""
              className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
              src={hero4}
            />
            <p className="text-xl font-semibold leading-tight">
              Mariam Khasawneh
            </p>
            <p className="dark:text-gray-600">Developer</p>
          </div>
          <div className="flex flex-col justify-center m-4 text-center">
            <img
              alt=""
              className="self-center flex-shrink-0 w-24 h-24 mb-4 bg-center bg-cover rounded-full dark:bg-gray-500"
              src={hero4}
            />
            <p className="text-xl font-semibold leading-tight">Hashem Frehat</p>
            <p className="dark:text-gray-600">Developer</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <div
      id="card "
      className="grid grid-cols-1 md:grid-cols-2 bg-gradient-second p-10 md:p-20 rounded-2xl "
    >
      <div id="content" className="flex flex-col gap-4 justify-between">
        <div className="flex flex-col gap-5">
          <p className="text-text-prim font-sans font-bold text-4xl">
            Be Part of the Biggest eGaming Events!
          </p>
          <p className="font-sans font-medium text-text-second text-xl">
            Create an account and get your tickets for the hottest eGaming
            events.
          </p>
        </div>
        <div className="w-full md:w-1/2 ">
          <MainButton>Available Tickets</MainButton>
        </div>
      </div>
      <div id="img" className="flex justify-end invisible md:visible">
        <img src={cta} className="w-1/2 h-auto" />
      </div>
    </div>
  );
}

export default Home;
