import React from "react";
import imghi from "../../img/7f54727102d3460ea92d4fab763e7683f191ab0b.jpg"; // عدّلي المسار لو مختلف
import { NavLink } from 'react-router-dom';

export default function Hi() {
  return (
    <section className="hero-page">
      <img src={imghi} alt="Handshake" className="hero-bg" />

      <div className="hero-layer">
        <div className="hero-card">
          <h1 className="hero-title">StayMatch</h1>
          <p className="hero-subtitle">
            Where comfort meets connection — discover your ideal space
          </p>
          <NavLink  to="/register" className="hero-button">Get Started</NavLink>
        </div>
      </div>
    </section>
  );
}
