import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./Login.module.css";
import { AuthSliceActions } from "../store";
import { useHistory } from "react-router-dom";

//firebase API_KEY = AIzaSyBPuxyJF3qjZuYa6t38IZADvo2YrYr1vxQ

function Login() {
  const [loginPage, setLoginPage] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();

  async function submitHandler(e) {
    let url;
    e.preventDefault();
    if (loginPage) {
      //Login Code
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBPuxyJF3qjZuYa6t38IZADvo2YrYr1vxQ";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBPuxyJF3qjZuYa6t38IZADvo2YrYr1vxQ";
      //SignuP url
    }
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
        returnSecureToken: true,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      dispatch(
        AuthSliceActions.login({ id: data.idToken, email: data.localId })
      );
      history.replace("/home");
    } else {
      const data = await response.json();
      alert(data.error.message);
      history.replace("/");
    }
  }

  return (
    <>
      <div className={classes.formContainer}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className={classes.form}
        >
          <h3 className={classes.formHeading}>
            {loginPage ? "Login" : "Sign Up"}
          </h3>
          <div className={classes.formControl}>
            <label>Email</label>
            <input required type="email" ref={emailRef} />
          </div>
          <div className={classes.formControl}>
            <label>Password</label>
            <input required type="password" ref={passwordRef} />
          </div>
          <div className={classes.formControl}>
            <button onClick={submitHandler}>
              {loginPage ? "Login" : "Create New Account"}
            </button>
          </div>
          <div className={classes.formControl}>
            <a
              onClick={() => {
                setLoginPage((prevState) => !prevState);
              }}
            >
              {loginPage
                ? "New Here? Please Sign Up"
                : "Already Signed Up!! Click here to Login"}
            </a>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
