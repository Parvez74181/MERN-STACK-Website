import { useNavigate } from "react-router-dom";
import getTime from "../components/GetTime";
import Parser from "html-react-parser";

import clockIcon from "../images/clock.png";
import writerIcon from "../images/writer.png";

function Documentation(props) {
  const { documentation } = props;

  const navigate = useNavigate();
  const handleClick = (i) => {
    navigate(
      `/documentation/${documentation[i].title}/${documentation[i]._id}`,
      {
        state: { documentation, si: i },
      }
    );
  };

  return (
    <>
      {documentation.map((documentation, i) => {
        const time = getTime(new Date(documentation.createdAt).getTime());

        return (
          <div
            className="card"
            key={documentation._id}
            style={{ width: "18rem" }}
          >
            <div className="card-body">
              {/* title */}
              <h5 className="card-title blog-title">{documentation.title} </h5>
              <div className="utils d-flex my-2 justify-content-between">
                {/* writer name */}
                <span className="d-flex justify-content-center align-items-center">
                  <img src={writerIcon} alt="" className="writerIcon" />
                  {documentation.authore}
                </span>
                {/* upload time */}
                <span className="d-flex justify-content-center align-items-center">
                  <img src={clockIcon} alt="" className="clockIcon" /> {time}
                </span>
              </div>
              {/* description */}
              <div className="card-text blog-description">
                {Parser(`${documentation.desc}`)}
              </div>

              <button onClick={() => handleClick(i)} className="btn">
                Read More
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Documentation;
