import { Link } from "react-router-dom";
import htmlExample from "../images/html-example.png";

function HtmlExampleSection() {
  return (
    <>
      {/* html section */}
      <div
        className="container-fluid flex panel"
        style={{
          background: "#E0EFDE",
          minHeight: "100vh",
        }}
      >
        <h1 className="h1 section-h1 ">
          <b>HTML</b>
        </h1>
        <p className="section-text ">
          The language for building web page structure
        </p>
        <Link to="/tutorial/html" className="btn section-learning-btn">
          Learn HTML
        </Link>
        <br />
        <Link to="/references/html" className="btn section-references-btn">
          HTML References
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
              <h4 className="h4 pt-4 pb-1 px-4">HTML Example:</h4>
              <div
                className="mx-5 mb-3 p-2"
                style={{
                  background: "#f8f8f8",
                  borderRadius: "5px",
                  border: "1px solid black",
                }}
              >
                <img
                  src={htmlExample}
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

export default HtmlExampleSection;
