import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo/logo.png";
import { AuthContext } from "../context/AuthProvider";

const NavItems = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [socialToggle, setSocialToggle] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);

  const {user} = useContext(AuthContext);
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      setHeaderFixed(true);
    } else {
      setHeaderFixed(false);
    }
  });

  return (
    <header
      className={`header-section style-4 ${
        headerFixed ? "header-fixed fadeInUp" : ""
      }`}
    >
      <div className={`header-top d-md-none ${socialToggle ? "open" : ""}`}>
        <div className="container">
          <div className="header-top-area">
            <Link to="/signup" className="lab-btn me-5">
              <span>Create Account</span>
            </Link>
            <Link to="/login">
              <span>Log In</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="header-bottom">
        <div className="container">
          <div className="header-wrapper">
            <div className="logo-search-acte">
              <div className="logo">
                <Link to={"/"} onClick={() => {setMenuToggle(false); setSocialToggle(false)}}>
                  <img src={logo} alt="logo" />
                </Link>
              </div>
            </div>

            <div className="menu-area">
              <div className="menu">
                <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                  <li>
                    <Link to="/" onClick={() => setMenuToggle(false)}>Home</Link>
                  </li>
                  <li>
                    <Link to="/shop"onClick={() => setMenuToggle(false)} >Shop</Link>
                  </li>
                  <li>
                    <Link to="/blog" onClick={() => setMenuToggle(false)}>Blog</Link>
                  </li>
                  <li>
                    <Link to="/about" onClick={() => setMenuToggle(false)}>About</Link>
                  </li>
                  <li>
                    <Link to="/contact" onClick={() => setMenuToggle(false)}>Contact</Link>
                  </li>
                </ul>
              </div>

              <Link to="/signup" className="lab-btn me-3 d-none d-md-block">
                Create Account
              </Link>
              <Link to="/login" className="d-none d-md-block">
                Log In
              </Link>

              <div
                onClick={() => {setMenuToggle(!menuToggle); setSocialToggle(false)}}
                className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div
                onClick={() => {setSocialToggle(!socialToggle); setMenuToggle(false);}}
                className="ellepsis-bar d-md-none"
              >
                <i className="icofont-info-square"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavItems;
