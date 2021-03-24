import React from "react";
import { Link } from "react-router-dom";

export default function header() {
  return (
    <div className="nav_bar">
      <div className="container">
        <div className="row align-items-center py-3 m-0">
          <div className="nav_start">
            <Link to="/dashboard" className="nav_brand">
              <div className="nav_brand_wrap">
                <p>
                  Hack Ideas
                </p>
              </div>
            </Link>
          </div>
          <Link className="logout_btn" to="/">Logut</Link>
        </div>
      </div>
    </div>
  );
}
