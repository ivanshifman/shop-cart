import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo/logo.png";
import { AuthContext } from "../context/AuthProvider";
import { Dropdown, DropdownButton, NavDropdown } from "react-bootstrap";
import toast from "react-hot-toast";

const NavItems = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [socialToggle, setSocialToggle] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false);

  const { user, logOut } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Sign-out succesfully")
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
      {!user && (
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
      )}

      <div className="header-bottom">
        <div className="container">
          <div className="header-wrapper">
            <div className="logo-search-acte">
              <div className="logo">
                <Link
                  to={"/"}
                  onClick={() => {
                    setMenuToggle(false);
                    setSocialToggle(false);
                  }}
                >
                  <img src={logo} alt="logo" />
                </Link>
              </div>
            </div>

            <div className="menu-area">
              <div className="menu">
                <ul className={`lab-ul ${menuToggle ? "active" : ""}`}>
                  <li>
                    <Link to="/" onClick={() => setMenuToggle(false)}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop" onClick={() => setMenuToggle(false)}>
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" onClick={() => setMenuToggle(false)}>
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" onClick={() => setMenuToggle(false)}>
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" onClick={() => setMenuToggle(false)}>
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              {user ? (
                <DropdownButton
                  id="dropdown-basic-button"
                  title="User"
                  variant="success"
                  onClick={() => {
                    setMenuToggle(false);
                    setSocialToggle(false);
                  }}
                >
                  <Dropdown.Item as={Link} to="/cart-page">
                    Shopping Cart
                  </Dropdown.Item>
                  <NavDropdown.Divider />
                  <Dropdown.Item onClick={handleLogOut}>Log Out</Dropdown.Item>
                </DropdownButton>
              ) : (
                <>
                  <Link to="/signup" className="lab-btn me-3 d-none d-md-block">
                    Create Account
                  </Link>
                  <Link to="/login" className="d-none d-md-block">
                    Log In
                  </Link>
                </>
              )}

              <div
                onClick={() => {
                  setMenuToggle(!menuToggle);
                  setSocialToggle(false);
                }}
                className={`header-bar d-lg-none ${menuToggle ? "active" : ""}`}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
              {!user && (
                <div
                  onClick={() => {
                    setSocialToggle(!socialToggle);
                    setMenuToggle(false);
                  }}
                  className="ellepsis-bar d-md-none"
                >
                  <i className="icofont-info-square"></i>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavItems;
