import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Login-Register/Auth";
import Home from "./home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
