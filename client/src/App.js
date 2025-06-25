import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginSignup from "./components/LoginSignup";
import DetailsForm from "./components/DetailsForm";
import Welcome from "./components/Welcome";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/details" element={<DetailsForm />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
