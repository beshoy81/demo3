import React from "react";
import notfound4040 from "../../img/vUmMyG7Nho.gif";
import { NavLink } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center text-center bg-body bg-white" style={{ minHeight: "100vh" }}>
      
      <img 
        src={notfound4040} 
        alt="404 Not Found" 
        className="img-fluid mb-4" 
        style={{ maxWidth: "450px" }}
      />

      <h2 className=" text-black fw-bold mb-2">Something went wrong...</h2>

      <h5 className="text-muted mb-4">
        Sorry, we’re having some errors.<br />Try refreshing the page — sometimes it works!
      </h5>

      <NavLink to="/home" className="btn btn-primary px-5 bg-primary nav-link py-3">
        Go Back Home
      </NavLink>
    </div>
  );
}
