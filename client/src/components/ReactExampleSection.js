import { Link } from "react-router-dom";
import ReactExample from "../images/react-example.png";

function ReactExampleSection() {
  return (
    <>
      {/* React section */}
      <div
        className="container-fluid flex panel"
        style={{ background: "#ffcece", minHeight: "100vh" }}
      >
        <h1 className="h1 section-h1 ">
          <b>React</b>
        </h1>
        <p className="section-text ">
          The language for building user interface components
        </p>
        <Link to="/tutorial/react" className="btn section-learning-btn">
          Learn React
        </Link>
        <br />
        <Link to="/references/react" className="btn section-references-btn">
          React References
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
              <h4 className="h4 pt-4 pb-1 px-4">React Example:</h4>
              <div
                className="mx-5 mb-3 p-2"
                style={{
                  background: "#f8f8f8",
                  borderRadius: "5px",
                  border: "1px solid black",
                }}
              >
                <img
                  src={ReactExample}
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

export default ReactExampleSection;
