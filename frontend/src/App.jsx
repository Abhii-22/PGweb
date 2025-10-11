import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home.jsx";
import Areas from "./components/Areas.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import ContactUs from "./components/ContactUs.jsx";
import Upload from "./components/Upload.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Dashboard from "./components/PGowner/Dashboard.jsx";
import PgForm from "./components/PGowner/PgForm.jsx";
import UploadedPgs from "./components/PGowner/UploadedPgs.jsx";
import Profile from "./components/PGowner/Profile.jsx";
import TenantForm from "./components/PGowner/TenantForm.jsx";
import { UserProvider } from "./context/UserContext.jsx";


function App() {
  return (
    <UserProvider>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/areas" element={<Areas />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/pg-owner/dashboard" element={<Dashboard />} />
      <Route path="/pg-owner/pg-form" element={<PgForm />} />
            <Route path="/pg-owner/uploaded-form" element={<UploadedPgs />} />
      <Route path="/pg-owner/profile" element={<Profile />} />
      <Route path="/pg-owner/tenant-form" element={<TenantForm />} />
      
    </Routes>
    </UserProvider>
  );
}

export default App;
