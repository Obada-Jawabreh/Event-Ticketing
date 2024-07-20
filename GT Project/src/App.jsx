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

function App() {
  return (
    <div className="bg-prim-dark">
      <BrowserRouter>
        <Nav />
        {/* <Checkout /> */}
        <Routes>
          <Route path="/signup" element={<SiginUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="catalog/Details" element={<Details />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<ProfileSettings />} />
        </Routes>
        <Foot />
      </BrowserRouter>
    </div>
  );
}

export default App;
