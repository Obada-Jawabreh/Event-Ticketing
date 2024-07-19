import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Catalog from "./Pages/Catalog";
import LogIn from "./Pages/Log in";
import SiginUp from "./Pages/Sigin up";
function App() {
  return (
    <div className="bg-prim-dark">
      <BrowserRouter>
        <Routes>
          <Route path="signup" element={<SiginUp />} />
          <Route path="login" element={<LogIn />} />
          <Route path="Catalog" element={<Catalog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
