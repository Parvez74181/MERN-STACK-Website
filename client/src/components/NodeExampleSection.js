import { Link } from "react-router-dom";
import NodeExample from "../images/node-example.png";

function NodeExampleSection() {
  return (
    <>
      {/* Node.js section */}
      <div
        className="container-fluid flex panel"
        style={{ background: "#c2defb", minHeight: "100vh" }}
      >
        <h1 className="h1 section-h1 ">
          <b>Node.js</b>
        </h1>
        <p className="section-text ">
          The language for building user interface components
        </p>

        <Link to="/tutorial/nodejs" className="btn section-learning-btn">
          Learn Node.js
        </Link>
        <br />

        <Link to="/references/nodejs" className="btn section-references-btn">
          Node.js References
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
              <h4 className="h4 pt-4 pb-1 px-4">Node.js Example:</h4>
              <div
                className="mx-5 mb-3 p-2"
                style={{
                  background: "#f8f8f8",
                  borderRadius: "5px",
                  border: "1px solid black",
                }}
              >
                <img
                  src={NodeExample}
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

export default NodeExampleSection;
