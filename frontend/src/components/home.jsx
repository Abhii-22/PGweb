import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Medini logo White.png";
import ContactUs from "./ContactUs.jsx";
import Footer from "./Footer.jsx";
import Amenities from "./amenities.jsx";
import Feedback from "./feedback.jsx";
import AnimatedSection from "./AnimatedSection.jsx";
import "./Home.css"; // ✅ Import CSS file

const Home = () => {
  const [areasData, setAreasData] = useState([]);
  const [active, setActive] = useState("Home");
  const [showNavbar, setShowNavbar] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");
  const navigate = useNavigate();
  const timeoutId = useRef(null);

  const handleMouseMove = () => {
    setShowNavbar(true);
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => setShowNavbar(false), 2000);
  };

    useEffect(() => {
    const fetchAreas = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/pgs');
            const pgs = response.data;
            const uniqueAreaNames = [...new Set(pgs.map(pg => pg.area))];
            const areaObjects = uniqueAreaNames.map(name => ({ name }));
            setAreasData(areaObjects);
        } catch (error) {
            console.error("Error fetching areas:", error);
        }
    };
    fetchAreas();
  }, []);

  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const areaExists = areasData.some(
      (area) => area.name.toLowerCase() === query
    );

    if (areaExists) {
      navigate('/areas', { state: { searchQuery: query } });
    } else {
      setSearchError(`Sorry, we couldn't find any PGs in "${searchQuery}".`);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId.current);
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <div className={`navbar-container ${showNavbar ? "visible" : "hidden"}`}>
        <header className="d-flex align-items-center w-100">
          <div className="d-flex align-items-center gap-3">
            <img src={logo} alt="Logo" className="navbar-logo" />
            
          </div>

          {/* Desktop Navigation */}
          <ul className="nav nav-pills ms-auto">
            <li className="nav-item mx-2">
              <a href="#home" className={`nav-link ${active === 'Home' ? 'active-link' : ''}`} onClick={() => setActive('Home')}>Home</a>
            </li>
            <li className="nav-item mx-2">
              <Link to="/areas" className={`nav-link ${active === 'Areas' ? 'active-link' : ''}`} onClick={() => setActive('Areas')}>Areas</Link>
            </li>
            <li className="nav-item mx-2">
              <a href="#amenities" className={`nav-link ${active === 'Amenities' ? 'active-link' : ''}`} onClick={() => setActive('Amenities')}>Amenities</a>
            </li>
            <li className="nav-item mx-2">
              <a href="#feedback" className={`nav-link ${active === 'Feedback' ? 'active-link' : ''}`} onClick={() => setActive('Feedback')}>Feedback</a>
            </li>
            <li className="nav-item mx-2">
              <a href="#contact-us" className={`nav-link ${active === 'Contact Us' ? 'active-link' : ''}`} onClick={() => setActive('Contact Us')}>Contact Us</a>
            </li>
          </ul>

          {/* ✅ Toggle Button for Mobile */}
          <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>

          {/* ✅ Dropdown Menu for Mobile */}
          <div className={`navbar-dropdown ${menuOpen ? "show" : ""}`}>
            {[
              { name: "Home", link: "#home" },
              { name: "Areas", link: "#areas" },
              { name: "Amenities", link: "#amenities" },
              { name: "Feedback", link: "#feedback" },
              { name: "Contact Us", link: "#contact-us" },
            ].map((item) => (
              <a key={item.name} href={item.link} onClick={() => setMenuOpen(false)}>
                {item.name}
              </a>
            ))}
          </div>
        </header>
      </div>

      {/* Hero Section */}
      <div id="home" className="hero-section">
        <div className="hero-content-container">
          <div className="hero-text">
            <h1 className="home-title">
              <span>Find</span> <span>Your</span> <span>Perfect</span> <span>PG</span> <span>Today</span>
            </h1>
            <p className="home-subtitle">
              Discover the best paying guest accommodations with all the amenities you need for a comfortable stay.
            </p>
            <div className="search-container">
              <input
                type="text"
                placeholder="Enter an area to search..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchError(""); // Clear error when user types
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button className="search-button" onClick={handleSearch}>Search</button>
            </div>
            {searchError && <p className="search-error-message">{searchError}</p>}
            <Link to="/upload" className="get-started-btn">Upload Your PG</Link>
          </div>
          <div className="hero-image">
            <img src="/home-image.jpg" alt="Comfortable PG accommodation" />
          </div>
        </div>
      </div>

      <div id="amenities">
        <AnimatedSection>
          <Amenities />
        </AnimatedSection>
      </div>

      <div id="feedback">
        <AnimatedSection>
          <Feedback />
        </AnimatedSection>
      </div>

      {/* Contact Us Section */}
      <div id="contact-us">
        <AnimatedSection>
          <ContactUs />
        </AnimatedSection>
      </div>

      <div style={{ marginTop: "-100px" }}>
        <AnimatedSection>
          <Footer />
        </AnimatedSection>
      </div>
    </>
  );
};

export default Home;
