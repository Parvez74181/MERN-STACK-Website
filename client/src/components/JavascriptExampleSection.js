import { Link } from "react-router-dom";
import JavaScriptExample from "../images/js-example.png";

function JavascriptExampleSection() {
  return (
    <>
      {/* JavaScript section */}
      <div
        className="container-fluid flex panel"
        style={{ background: "#ffd4a8", minHeight: "100vh" }}
      >
        <h1 className="h1 section-h1 ">
          <b>JavaScript</b>
        </h1>
        <p className="section-text ">The language for programming web pages</p>
        <Link to="/tutorial/javascript" className="btn section-learning-btn">
          Learn JavaScript
        </Link>
        <br />
        <Link
          to="/references/javascript"
          className="btn section-references-btn"
          style={{ fontSize: "15px" }}
        >
          JavaScript References
        </Link>
        <br />
        <br />
        <div className="container">
          <div className="row">
            <div
              className="col-12"
              style={{
                background: "#f8f8f8",
                borderRadius: "7px",
              }}
            >
              <h4 className="h4 pt-4 pb-1 px-4">JavaScript Example:</h4>
              <div
                className="mx-5 mb-3 p-2"
                style={{
                  background: "#f8f8f8",
                  borderRadius: "5px",
                  border: "1px solid black",
                }}
              >
                <img
                  src={JavaScriptExample}
                  className="img-fluid"
                  alt="JavaScript example"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JavascriptExampleSection;
