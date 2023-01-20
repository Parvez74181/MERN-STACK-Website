import { useEffect } from "react";
import { NavLink as Link, useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";

import "../css/navbar.min.css";
import logo from "../images/logo.png";

export default function Navbar() {
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    const calssNames = () => {
      let home = document.querySelectorAll(".home-link");
      home.forEach((home) => {
        location.pathname !== "/"
          ? home.classList.remove("active")
          : home.classList.add("active");
      });
    };
    calssNames();
  }, [location.pathname]);
  // hide the offcanvas menu if user clicks the "nav-links"
  const hideMenu = () => {
    let offCanvas_btn = document.querySelector(".offcanvas .btn-close");
    offCanvas_btn.click();
  };

  // for handling search results
  const handleSubmit = async (e) => {
    e.preventDefault();
    // search data
    let searchInput = document.querySelector("#search-input");

    // if searchInput box has value then request to show data
    if (searchInput.value.trim().length) {
      if (
        location.pathname === "/blog" ||
        location.pathname === "/tutorial" ||
        location.pathname === "/documentation"
      )
        navigate(`${location.pathname}/search/${searchInput.value}`, {
          state: { value: searchInput.value },
        });
      // navigate to the search result page and make state = searchInput value to make a request and get data and show the results in the search result page
      // *** //
      // this navigation for if user search from the other page then navigate to this path
      else
        navigate(`/search/${searchInput.value}`, {
          state: { value: searchInput.value },
        }); // navigate to the search result page and make state = searchInput value to make a request and get data and show the results in the search result page
    }
  };

  let remember = localStorage.getItem("remember"); // get the remember value from the localStorage

  // if remember==='true' (localStorage data is in string) then remove token from the localStorage after 3 months else remove this after 1day
  setTimeout(
    () => {
      localStorage.removeItem("token");
    },
    remember === "true"
      ? new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000) // 3months
      : new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) // 1day
  );

  const navLinks = [
    { path: `/`, name: `Home`, class: "home-link" },
    { path: `/blog`, name: `Blog` },
    { path: `/tutorial`, name: `Tutorial` },
    { path: `/documentation`, name: `Documentation` },
    // { path: `/about`, name: `About` },
    { path: `/login`, name: `Login` },
  ];

  let token = localStorage.getItem("token"); // get the token value from the localStorage
  if (token) {
    // Find the index of the object with the specified path
    let index = navLinks.findIndex((item) => item.path === `/login`);
    // Remove the object from the array
    navLinks.splice(index, 1);

    navLinks.push({ path: `/backend`, name: `Dashboard` }); // add dashboard
    navLinks.push({ path: `/log-out`, name: `Logout`, class: "log-out" }); // add logout options
  }

  let logOut = document.querySelector(".log-out");
  if (logOut) {
    logOut.addEventListener("click", async (e) => {
      e.preventDefault();
      let token = localStorage.getItem("token");

      let res = await Axios.post("/user/logout", token);

      if (res.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("remember");
        navigate("/login", { state: "logout" });
      }
    });
  }
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg sticky-top">
        <div className="container-fluid">
          <Link className={`navbar-brand home-link`} to="/">
            <img src={logo} alt="logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            {/*hamburger menu bar */}
            <div className="bar"></div>
          </button>

          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              {/* all navLinks */}
              {navLinks.map((link) => {
                return (
                  <>
                    <li className="nav-item ">
                      <Link
                        className={`nav-link ${link.class}`}
                        aria-current="page"
                        to={link.path}
                      >
                        {link.name}
                      </Link>
                    </li>
                  </>
                );
              })}
            </ul>

            {/* search bar */}
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
              <input
                className="form-control me-2 px-3"
                type="search"
                id="search-input"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn" type="submit" id="search-submit-btn">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* offcanvas menubar for mobile or small device view */}
      <div
        className="offcanvas offcanvas-end text-bg-dark"
        tabIndex="-1"
        style={{ width: "250px" }}
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header">
          <Link
            className="px-2 navbar-brand home-link"
            to="/"
            onClick={hideMenu}
          >
            <img src={logo} alt="logo" style={{ width: "80%" }} />
          </Link>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end pe-3">
            {navLinks.map((link, i) => {
              return (
                <>
                  <li className="nav-item ">
                    <Link
                      className={`nav-link ${link.class}`}
                      aria-current="page"
                      to={link.path}
                      onClick={hideMenu}
                    >
                      {link.name}
                    </Link>
                  </li>
                </>
              );
            })}
          </ul>
          {/* search form */}
          <form className="pl-2 d-flex mt-3" role="search">
            <input
              className="form-control me-2 px-3"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-sm btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
