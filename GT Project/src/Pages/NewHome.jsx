import heroImg from "../images/heroImg.png";
import MainButton from "../Components/Buttons/MainButton";
// import hero3 from "../images/3.png";

function Home() {
  return (
    <div>
      <Hero />
    </div>
  );
}

function Hero() {
  return (
    <div
      id="hero-container"
      className=" relative grid grid-cols-1 md:grid-cols-2 justify-center content-center mx-8 sm:mx-8 lg:mx-12 xl:mx-24 mb-40"
    >
      <div
        id="gradiant"
        className="absolute top-0 left-0 right-0 w-80 md:w-96 h-96 shrink-0 rounded-full blur-3xl  bg-indigo-800  "
      ></div>
      <div
        id="gradiant"
        className="absolute bottom-0 right-100 w-80 md:w-96 h-96 shrink-0 rounded-full blur-3xl bg-pink-500"
      ></div>
      <div id="img" className="relative z-10">
        <img src={heroImg} />
      </div>
      <div
        id="content"
        className=" content-center justify-center relative z-10 "
      >
        <div id="text" className=" flex flex-col gap-6">
          <p className="text-white font-sans font-bold text-3xl md:text-7xl ">
            Experience the Ultimate eGaming Events Live!
          </p>
          <p className="text-white font-sans font-medium text-lg md:text-xl text-justify">
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

export default Home;
