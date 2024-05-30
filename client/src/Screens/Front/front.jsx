import React from "react";
import "./front.css";
import { Link } from "react-router-dom";

function front() {
  return (
    <div>
      <h1
        style={{ textAlign: "center", color: "#011937", fontFamily: "cursive" ,fontSize:'20px'}}
      >
        <span style={{ color: "#eb234f",fontSize:'30px'}}>H</span>OLOWARE
        <span style={{ color: "#eb234f",fontSize:'30px' }}>   P</span>RICING
      </h1>
      <div>
        <Link to="/GEM_Certificate">
          <button id="button">GEM Certificate</button>
        </Link>
        <Link to="/MII_Certificate">
          <button id="button">MII Certificate</button>
        </Link>
        <Link to="/MAF_Certificate">
          <button id="button">Make In India Certificate</button>
        </Link>
        <Link to="/Warranty_Certificate">
          <button id="button">Warranty Certificate</button>
        </Link>
      </div>
    </div>
  );
}

export default front;
