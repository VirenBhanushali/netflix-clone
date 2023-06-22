import classes from "./AccountOptions.module.css";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AuthSliceActions } from "../store";

function AccountOptions(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  function turnOffAccounts() {
    props.turnOffAccounts(false);
  }
  function enteredMouse() {}

  function logoutHandler() {
    dispatch(AuthSliceActions.logout());
    history.replace("/");
    window.location.reload();
  }

  return (
    <div
      onMouseLeave={turnOffAccounts}
      onMouseEnter={enteredMouse}
      className={classes.accountOptions}
    >
      <ul>
        <li>
          <Link className={classes.links} to="/account-details">
            Account Details
          </Link>
        </li>
        <li>
          <Link className={classes.links} to="/help">
            Help
          </Link>
        </li>
        <li>
          <Link onClick={logoutHandler} className={classes.links} to="/sign-in">
            Sign Out
          </Link>
        </li>
      </ul>
    </div>
  );
}
export default AccountOptions;
