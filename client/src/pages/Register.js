import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";

import passwordIcon from "../images/password.png";
import emailIcon from "../images/email.png";
import userIcon from "../images/user.png";
import telephoneIcon from "../images/telephone.png";

function Register(props) {
  const { progress } = props;
  const navigate = useNavigate();

  const [input, setInput] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setInput({ ...input, [name]: value.trim() });
  };

  progress(0);

  useEffect(() => {
    document.title = "Create an account | Futurisers";
    progress(100);
  }, [progress]);

  // login form submit
  const submit = async (e) => {
    try {
      e.preventDefault();
      if (input.password === input.confirmPassword) {
        let confirmPassword = document.querySelector(".user-confirm-password");
        let password = document.querySelector(".user-password");
        confirmPassword.classList.add("d-none"); // hide error message
        password.classList.add("d-none"); // hide error message

        let res = await Axios.post("/user/register", input);

        if (res.status === 201) navigate("/login", { state: true }); // if user created then redirect to the login page
      } else {
        let confirmPassword = document.querySelector(".user-confirm-password");
        let password = document.querySelector(".user-password");
        confirmPassword.classList.remove("d-none"); // show error message
        password.classList.remove("d-none"); // show error message
      }
    } catch (e) {
      let error = e.response.data.errors; // if server return an error then show the error message to user

      let userName = document.querySelector(`.user-name`);
      let email = document.querySelector(`.user-email`);
      let phone = document.querySelector(`.user-phone`);
      let password = document.querySelector(`.user-password`);
      let confirmPassword = document.querySelector(`.user-confirm-password`);

      error.forEach((e) => {
        if (e.param === "userName") {
          userName.innerText = e.msg;
          userName.classList.remove("d-none");
        }
        if (e.param === "email") {
          email.innerText = e.msg;
          email.classList.remove("d-none");
        }
        if (e.param === "phone") {
          phone.innerText = e.msg;
          phone.classList.remove("d-none");
        }
        if (e.param === "password") {
          password.innerText = e.msg;
          password.classList.remove("d-none");
        }
        if (e.param === "confirmPassword") {
          confirmPassword.innerText = e.msg;
          confirmPassword.classList.remove("d-none");
        }
      });
    }
  };

  return (
    <>
      <main>
        <div className="container d-flex justify-content-center align-items-center flex-column col-lg-5 col-xl-3 col-md-6 col-sm-7 col-11 mb-5 mb-lg-0 mt-5 login-container">
          <div className="login-card rounded-2" style={{ minWidth: "45vh" }}>
            <h2 className="h2 mt-3">Register</h2>
            <div className="card-body pt-5 pb-3 px-4">
              {/* register form */}
              <form>
                {/* user name */}
                <div className="wrapper mb-3">
                  <label className="form-label text-light" htmlFor="username">
                    User Name
                  </label>
                  <div className="form-outline position-relative d-flex justify-content-start align-items-center">
                    <img
                      src={userIcon}
                      className="position-absolute emailIcon"
                      style={{ left: "5px" }}
                      alt=""
                    />

                    <input
                      type="text"
                      name="userName"
                      className="form-control text-dark"
                      id="userName"
                      value={input.userName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* error massege */}
                  <span className="text-danger d-none user-name">
                    UserName is not valid!
                  </span>
                </div>

                {/* email */}
                <div className="wrapper mb-3">
                  <label className="form-label text-light" htmlFor="email">
                    Email address
                  </label>
                  <div className="form-outline position-relative d-flex justify-content-start align-items-center">
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
                      value={input.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* error massege */}
                  <span className="text-danger d-none user-email">
                    Email is already in use
                  </span>
                </div>

                {/* phone */}

                <div className="wrapper mb-3">
                  <label className="form-label text-light" htmlFor="phone">
                    Phone
                  </label>
                  <div className="form-outline position-relative d-flex justify-content-start align-items-center">
                    <img
                      src={telephoneIcon}
                      className="position-absolute emailIcon"
                      style={{ left: "5px" }}
                      alt=""
                    />

                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      className="form-control text-dark"
                      value={input.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* error massege */}
                  <span className="text-danger d-none user-phone">
                    Phone is already in use
                  </span>
                </div>

                {/* password */}
                <div className="wrapper mb-3">
                  <label className="form-label text-light" htmlFor="password">
                    Password
                  </label>
                  <div className="form-outline position-relative d-flex justify-content-start align-items-center">
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
                      value={input.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* error massege */}
                  <span className="text-danger d-none user-password">
                    Password Doesn't machted!
                  </span>
                </div>

                {/* Confirm password */}
                <div className="wrapper mb-3">
                  <label
                    className="form-label text-light"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <div className="form-outline position-relative d-flex justify-content-start align-items-center">
                    <img
                      src={passwordIcon}
                      className="position-absolute passwordIcon"
                      style={{ left: "5px" }}
                      alt=""
                    />
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      className="form-control text-dark"
                      value={input.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* error massege */}
                  <span className="text-danger d-none user-confirm-password">
                    Password Doesn't machted!
                  </span>
                </div>

                {/* submit button */}
                <div>
                  <button
                    type="submit"
                    className="btn btn-block mb-4 mt-2"
                    style={{ width: "100%" }}
                    onClick={submit}
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Register;
