import { Link } from "react-router-dom";
import cssExample from "../images/css-example.png";

function CssExampleSection() {
  return (
    <>
      {/* css section */}
      <div
        className="container-fluid flex panel"
        style={{ background: "#fcf4b8", minHeight: "100vh" }}
      >
        <h1 className="h1 section-h1 ">
          <b>CSS</b>
        </h1>
        <p className="section-text ">The language for styling web pages</p>
        <Link to="/tutorial/css" className="btn section-learning-btn">
          Learn CSS
        </Link>
        <br />
        <Link to="/references/css" className="btn section-references-btn">
          CSS References
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
              <h4 className="h4 pt-4 pb-1 px-4">CSS Example:</h4>
              <div
                className="mx-5 mb-3 p-2"
                style={{
                  background: "#f8f8f8",
                  borderRadius: "5px",
                  border: "1px solid black",
                }}
              >
                <img
                  src={cssExample}
                  className="img-fluid"
                  alt="html example"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CssExampleSection;
