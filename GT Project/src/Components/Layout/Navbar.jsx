"use client";
import { json, Link, Navigate } from "react-router-dom";
import { Navbar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import MainButton from "../Buttons/MainButton";
import TicketLogo from "../TicketLogo";

function Nav() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const handelLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <Navbar fluid rounded className="bg-blk px-12 lg:px-24 relative z-10">
      <Navbar.Brand>
        <Link to="/home">
          <div className="flex gap-2 place-items-center">
            <TicketLogo />
            <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
              GTickets
            </span>
          </div>
        </Link>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {user ? (
          <MainButton onClick={handelLogout}>Log out</MainButton>
        ) : (
          <Link to="/login">
            <MainButton className="bg-custom-red hover:bg-custom-red-hover ">
              Login
            </MainButton>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link to="/home">
          <Navbar.Link className="text-white text-base font-sans " href="/">
            Home
          </Navbar.Link>
        </Link>
        <Link to="/about">
          <Navbar.Link className="text-white text-base font-sans " href="/">
            About us
          </Navbar.Link>
        </Link>
        <Link to="/catalog">
          <Navbar.Link className="text-white text-base font-sans" href="#">
            Tickets
          </Navbar.Link>
        </Link>
        <Link to="/contact">
          <Navbar.Link className="text-white text-base font-sans" href="#">
            Get In Touch
          </Navbar.Link>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default Nav;
