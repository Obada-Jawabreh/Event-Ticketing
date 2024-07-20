"use client";
import { json, Link, Navigate } from "react-router-dom";
import { Button, Navbar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
// import logo from './images/8.png'
function Nav() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const handelLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <Navbar fluid rounded className="bg-blk">
      <Navbar.Brand>
        {/* <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
          GTickets
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {user ? (
          <Button className="bg-pin" onClick={handelLogout}>
            Log out
          </Button>
        ) : (
          <Link to="/login">
            <Button className="bg-pin">Login</Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link className="text-white" href="/">
          Home
        </Navbar.Link>
        <Navbar.Link className="text-white" href="#">
          Tickets
        </Navbar.Link>
        <Navbar.Link className="text-white" href="#">
          Event Legends
        </Navbar.Link>

        <Navbar.Link className="text-white" href="#">
          Quest for Help
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default Nav;
