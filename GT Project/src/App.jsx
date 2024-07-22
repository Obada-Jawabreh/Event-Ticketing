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
import Db from "./Pages/Dashboard.jsx"
// import about form './Pages/About us.jsx';
function App() {
  return (
    <div className="bg-prim-dark">
      <BrowserRouter>
        <Nav />
        {/* <HomeComponent /> /}
        {/ <Checkout /> */}
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/signup" element={<SiginUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="catalog/Details" element={<Details />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/Dhashboard" element={<Db />} />
          {/* <Route path="/aboutus" element={< about/>} /> */}
          <Route path="/" element={<HomeComponent />} />

        </Routes>

        <Foot />
      </BrowserRouter>
    </div>
  );
}

export default App;
