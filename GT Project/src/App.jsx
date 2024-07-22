import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Catalog from "./Pages/Catalog";
import LogIn from "./Pages/Log in";
import SiginUp from "./Pages/Sigin up";
import Checkout from "./Pages/Check out";
import Nav from "./Components/Layout/Navbar.jsx";
import Foot from "./Components/Layout/Footer.jsx";
import Details from "./Pages/Details.jsx";
import ProfileSettings from "./Pages/Profile.jsx";
import HomeComponent from "./Pages/Home.jsx";
import ContactUs from "./Pages/Contact us.jsx";
import Home from "./Pages/NewHome.jsx";

import Db from "./Pages/Dashboard.jsx";
import AboutUs from "./Pages/AboutUs.jsx";
<<<<<<< HEAD
import Error404 from "./Pages/Error404.jsx";

=======
>>>>>>> f60983380e7cd75d68178adb65b54064a9188dd5
function App() {
  return (
    <div className="bg-prim-dark font-sans">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<Home />} />

          <Route path="/signup" element={<SiginUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="catalog/Details" element={<Details />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/Dhashboard" element={<Db />} />
          <Route path="/about" element={<AboutUs />} />
<<<<<<< HEAD
          <Route path="*" element={<Error404 />} />
=======

>>>>>>> f60983380e7cd75d68178adb65b54064a9188dd5
        </Routes>
        <Foot />
      </BrowserRouter>
    </div>
  );
}

export default App;
