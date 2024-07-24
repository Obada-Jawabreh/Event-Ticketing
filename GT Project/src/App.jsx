import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Catalog from "./Pages/Catalog";
import LogIn from "./Pages/Log in";
import SiginUp from "./Pages/Sigin up";
import Checkout from "./Pages/Check out";
import Nav from "./Components/Layout/Navbar.jsx";
import Foot from "./Components/Layout/Footer.jsx";
import Details from "./Pages/Details.jsx";
import ProfileSettings from "./Pages/Profile.jsx";
import ContactUs from "./Pages/Contact us.jsx";
import Home from "./Pages/NewHome.jsx";
import Profile from "./Pages/Profile.jsx";
import Db from "./Pages/Dashboard.jsx";
import AboutUs from "./Pages/AboutUs.jsx";
import Error404 from "./Pages/Error404.jsx";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavAndFoot = location.pathname === "/dashboard";

  return (
    <div className="bg-prim-dark font-sans">
      {!hideNavAndFoot && <Nav />}
      {children}
      {!hideNavAndFoot && <Foot />}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SiginUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/details" element={<Details />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/dashboard" element={<Db />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
