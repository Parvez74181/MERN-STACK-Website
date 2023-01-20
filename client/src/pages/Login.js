import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Axios from "axios";
import Notification from "../components/Notification";

import passwordIcon from "../images/password.png";
import emailIcon from "../images/email.png";

function Login(props) {
  const { progress } = props;

  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [notificationState, setNotificationState] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState({
    status: "",
    data: "",
  });

  useEffect(() => {
    progress(100);
  }, []); // this effect is for just progressbar

  useEffect(() => {
    document.title = "Log In | Futurisers";
    // this is for notification

    if (location.state) {
      setNotificationMessage({
        status: "Success",
        data: "User Registration Successfull",
      });
      setNotificationState(true);
    }
    if (location.state === "logout") {
      setNotificationMessage({
        status: "Success",
        data: "Logout Successfull",
      });
      setNotificationState(true);
    }
    let rememberMeCheckbox = document.querySelector("#rememberMe");
    rememberMeCheckbox.addEventListener("click", () => {
      if (remember === false) {
        setRemember(true);
      } else {
        setRemember(false);
      }
    });
  }, [remember]);

  // login form submit
  const submit = async (e) => {
    try {
      e.preventDefault();

      let res = await Axios.post("/user/sign-in", {
        email,
        password,
        remember,
      });

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token); // saving the jwt token to the localStorage so than i can easily verify user
        localStorage.setItem("remember", remember); // saving the time to remove localStorage after 1day

        navigate("/backend", { state: true, details: res.data });
      }
    } catch (e) {
      setNotificationMessage({
        status: "Invalid",
        data: "Invalid Login details",
      });
      setNotificationState(true);
    }
  };

  return (
    <>
      <main>
        {notificationState && (
          <Notification
            status={`${notificationMessage.status}`}
            data={`${notificationMessage.data}`}
          />
        )}
        <div
          className="container d-flex justify-content-center align-items-center flex-column col-lg-5 col-xl-3 col-md-6 col-sm-7 col-11 mb-5 mb-lg-0 mt-5 login-container"
          style={{ minHeight: "70vh", minWidth: "100vw" }}
        >
          <div className="login-card rounded-2">
            <h2 className="h2 mt-3">Sign-In</h2>
            <div className="card-body  pt-3 pb-3 px-5">
              <form>
                {/* email */}
                <label className="form-label text-light" htmlFor="email">
                  Email address
                </label>
                <div className="form-outline mb-4 position-relative d-flex justify-content-start align-items-center">
                  <img
                    src={emailIcon}
                    className="position-absolute emailIcon"
                    style={{ left: "5px" }}
                    alt=""
                  />

                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control text-dark"
                    value={email}
                    onChange={(e) => {
                      setNotificationState(false);
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </div>
                {/* password */}
                <label className="form-label text-light" htmlFor="password">
                  Password
                </label>
                <div className="form-outline mb-4 position-relative d-flex justify-content-start align-items-center">
                  <img
                    src={passwordIcon}
                    className="position-absolute passwordIcon"
                    style={{ left: "5px" }}
                    alt=""
                  />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control text-dark"
                    value={password}
                    onChange={(e) => {
                      setNotificationState(false);
                      setPassword(e.target.value);
                    }}
                    required
                  />
                </div>
                {/* remember me button */}
                <div className="remember-me text-white d-flex justify-content-start align-items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    className="me-2"
                    id="rememberMe"
                  />
                  Remember Me
                </div>
                {/* submit button */}
                <div>
                  <button
                    type="submit"
                    className="btn  btn-block mb-4 mt-3"
                    style={{ width: "100%" }}
                    onClick={submit}
                  >
                    Sign in
                  </button>
                </div>

                {/* register option button */}
                <div className="register-text d-flex justify-content-around">
                  <span>Create an account</span>
                  <Link to="/register" className="disabled">
                    Click here
                  </Link>
                </div>
              </form>
            </div>
          </div>
          {/* social media login   */}
          <div className="text-center mt-5 d-flex justify-content-center align-items-center flex-column">
            <p className="text-light">or sign in with:</p>

            <div className="icons d-flex justify-content-center align-items-center">
              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-facebook-f"></i>
              </button>

              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-google"></i>
              </button>

              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-twitter"></i>
              </button>

              <button type="button" className="btn btn-link btn-floating mx-1">
                <i className="fab fa-github"></i>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
