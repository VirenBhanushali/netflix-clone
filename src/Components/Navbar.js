import classes from "./Navbar.module.css";
import { Link, NavLink, Route, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import Notification from "./Notification";
import AccountOptions from "./AccountOptions";
import { useDispatch, useSelector } from "react-redux";

function Navbar(props) {
  const [searchItem, setSearchedItem] = useState("");
  const [scrolled, changedScrolled] = useState(false);
  const history = useHistory();
  const isLoggedIn = useSelector((val) => val.auth.isLoggedIn);

  const dispatch = useDispatch();

  const [searchBar, toggleSearchBar] = useState(false);

  const [showNotifcationsInfo, toggleshowNotification] = useState(false);
  const [accountsOptions, toggleAccountOptions] = useState(false);
  //when Clicked on Search Button in navbar
  function searchButtonHandler(e) {
    console.log(searchBar);
    toggleSearchBar(!searchBar);
  }
  //Search Bar Input
  function searchInputHandler(e) {
    setSearchedItem(e.target.value);
  }

  //OnBlur
  function blurInputHandler(e) {
    toggleSearchBar(false);
  }

  function searchForSomething(e) {
    e.preventDefault();
    if (searchItem.trim().length > 0) {
      props.searchMethod(searchItem);
      setSearchedItem("");
    }
    console.log(searchItem);
  }

  function showNotifcations() {
    toggleshowNotification(true);
  }
  function showAccountOptions() {
    toggleAccountOptions(true);
  }

  function hideNotification() {
    toggleshowNotification(false);
  }

  return (
    <>
      <nav className={classes.navbar}>
        <div className={classes.logo}>
          <Link to="/home" className={classes.netflixLogo}>
            <img
              src="https://img.icons8.com/color/48/000000/netflix.png"
              alt="neflix_logo"
              height="60px"
            ></img>
          </Link>

          <div>
            <ul className={classes.links}>
              <li>
                <NavLink
                  activeClassName={classes.active}
                  className={classes.navlink}
                  to="/home"
                >
                  Movies
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName={classes.active}
                  className={classes.navlink}
                  to="/tvshows"
                >
                  Tv Shows
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeClassName={classes.active}
                  className={classes.navlink}
                  to="/my-list"
                >
                  My List
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className={classes.user}>
          {!searchBar && (
            <button onClick={searchButtonHandler}>
              <i className="fa fa-search fa-lg"></i>
            </button>
          )}
          {searchBar && (
            <form onSubmit={searchForSomething}>
              <div className={classes.searchbar}>
                <div>
                  <i className="fa fa-search"></i>
                </div>
                <input
                  placeholder={" Title , Tv Shows..."}
                  type="text"
                  onChange={searchInputHandler}
                  onBlur={blurInputHandler}
                ></input>
              </div>
            </form>
          )}

          <div
            className={classes.profile}
            onClick={() => {
              toggleAccountOptions((old) => !old);
            }}
          >
            <i className="fa fa-user fa-lg"></i>
            {accountsOptions && (
              <AccountOptions
                turnOffAccounts={toggleAccountOptions}
              ></AccountOptions>
            )}
          </div>
        </div>
      </nav>
      {showNotifcationsInfo && <Notification></Notification>}
    </>
  );
}

export default Navbar;
