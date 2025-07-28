import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "../assets/styles/button.css";
import "../assets/styles/landing-page.css";
import deliveryGuy from "../assets/images/delivery-guy.jpeg";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page-wrapper">
      <section className="hero-section">
        <div className="cta-section">
          <h1>Your package is delivered fast to your doorstep</h1>
          <p>
            {" "}
            We Deliver to your next door step. Experience fast, reliable, and
            convenient delivery services tailored to your needs.
          </p>
          <Button
            onClick={() => navigate("/login")}
            className="get-started-button"
          >
            <b>Get Started</b>
          </Button>
        </div>
        <div className="img-section">
          <img src={deliveryGuy} alt="Delivery Guy" />
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
