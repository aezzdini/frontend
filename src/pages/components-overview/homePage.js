
import { Email, Facebook, Twitter, Instagram } from "@mui/icons-material";
import Fade from "react-reveal/Fade";

import ServiceCard from "./ServiceCard ";
import "./homePage.css";

function HomePage() {
    return (
      <div className="homepage-root">
        <div className="homepage-header">
          <h1 className="homepage-title">Welcome to My Website</h1>
          <p className="homepage-subtitle">
            We offer the best services and solutions for your business needs.
          </p>
          <button className="homepage-button">Login</button>
        </div>
        <div className="homepage-content">
          <div className="homepage-contact-form">
            <h2>Contact Us</h2>
            <form>
              <div className="homepage-form-row">
                <input
                  type="text"
                  placeholder="Name"
                  className="homepage-input"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="homepage-input"
                />
              </div>
              <textarea
                rows="4"
                placeholder="Message"
                className="homepage-input"
              ></textarea>
              <button type="submit">Send</button>
            </form>
            <div className="homepage-social">
              <a href="#" className="homepage-social-icon">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="homepage-social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="homepage-social-icon">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="homepage-social-icon">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
          <div className="homepage-services">
            <h2>Our Services</h2>
            <div className="homepage-services-cards">
              <ServiceCard
                title="Service 1"
                description="This is a description for Service 1."
              />
              <ServiceCard
                title="Service 2"
                description="This is a description for Service 2."
              />
              <ServiceCard
                title="Service 3"
                description="This is a description for Service 3."
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default HomePage;