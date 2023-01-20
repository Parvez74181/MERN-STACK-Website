import { useState } from "react";
import { useNavigate } from "react-router-dom";
import onlineLearning from "../images/Online learning.gif";
import wave from "../images/wave.png";
import Axios from "axios";

function MainHeaderSection() {
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let value = e.target[0].value;
    if (value) {
      let res = await Axios(`/search/all?search=${value}`);
      if (res.status === 200) {
        navigate(`/search/${value}`, {
          state: { data: res.data },
        }); // navigate to the search result page and make state = res.data to show the results in the search result page
      }
    }
  };

  return (
    <>
      <div className="container-fluid px-3 py-3 panel">
        <div
          className="container-fluid "
          style={{
            width: "100%",
          }}
        >
          <div className="row ">
            <div className="col-12 col-sm-8 mt-5 pt-5 my-3">
              <h1 className="h1 home">
                শিখতে নেই মানা<span>...</span>
              </h1>
              <h2 className="h2 home">
                শিখি বাংলায়<span>...</span>
              </h2>

              {/* search bar */}
              <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input
                  className="form-control me-2 px-3"
                  type="text"
                  id="search-input"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn" type="submit" id="search-submit-btn">
                  Search
                </button>
              </form>
            </div>
            <div className="col-12 col-sm-4  mt-5">
              <img
                src={onlineLearning}
                className="img-fluid"
                alt="..."
                style={{ zIndex: "2" }}
              />
            </div>
          </div>
        </div>
      </div>
      <img className="img-fluid" id="wave" src={wave} alt="" />
    </>
  );
}

export default MainHeaderSection;
