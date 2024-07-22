"use client";
import { json, Link, Navigate } from "react-router-dom";
import { Button, Navbar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import MainButton from "../Buttons/MainButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { dbURL } from "../../FirebaseConfig/Config";
// import logo from './images/8.png'
function Nav() {
  const [dataUser, setUser] = useState({});

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const handelLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          console.log("Fetching data for user:", user);
          const response = await axios.get(`${dbURL}/users/${user}.json`);
          const data = response.data;

          if (data) {
            setUser(data);
            console.log("User data fetched successfully:", data);
          } else {
            console.log(`No data found for user with ID: ${user}`);
          }
        } catch (error) {
          console.error(
            `Error fetching data for user with ID: ${user}`,
            error
          );
        }
      } else {
        console.log("No user data found in local storage.");
      }
    };

    fetchData();
  }, [dbURL, user]);

  return (
    <Navbar fluid rounded className="bg-blk px-12 lg:px-24 relative z-10">
      <Navbar.Brand>
        {/* <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
          GTickets
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 items-center">
        {user && (
          <Link to="/Profile">
            <p className="text-white mr-10 whitespace-nowrap">
              {dataUser.name}
            </p>
          </Link>
        )}
        {user ? (
          <MainButton onClick={handelLogout}>Log out</MainButton>
        ) : (
          <Link to="/login">
            <MainButton className="bg-custom-red hover:bg-custom-red-hover">
              Login
            </MainButton>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link to="/home">
          <Navbar.Link className="text-white text-base font-sans" href="/">
            Home
          </Navbar.Link>
        </Link>
        <Link to="/about">
          <Navbar.Link className="text-white text-base font-sans" href="/">
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
