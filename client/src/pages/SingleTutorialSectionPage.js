import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Loading from "../components/Loading";
import { FcClock } from "react-icons/fc";
import getTime from "../components/GetTime";
import codeCopy from "../components/CodeCopy";
import Parser from "html-react-parser";
import Axios from "axios";

import clockIcon from "../images/clock.png";
import writerIcon from "../images/writer.png";

function SingleTutorialSectionPage(props) {
  const { progress } = props;
  const [loading, setLoading] = useState(true);
  const [tutorial, setTutorial] = useState([]);

  const { _id } = useParams();

  const navigate = useNavigate();

  progress(0);

  // fetching data
  const fetchData = useCallback(async () => {
    try {
      let res = await Axios.get(`/single-tutorial-section-page/${_id}`);
      document.title = `${res.data.title} | Futurisers.com`;

      setTutorial(res.data);

      setLoading(false); // set loading = false

      progress(100);
    } catch (e) {
      console.log(e);
      navigate("/pageNotFound");
    }
  }, [progress, _id, navigate]);

  useEffect(() => {
    progress(30);
    progress(50);
    fetchData();
  }, [fetchData, progress]);

  codeCopy();

  return (
    <>
      <main>
        {" "}
        {loading && <Loading />}
        {!loading && (
          <div className="row">
            <div
              className="container-fluid col-12 col-md-7 my-4 px-0"
              style={{ maxWidth: "80%" }}
            >
              <h2 className="card-title mb-3">{tutorial.title}</h2>
              <div className="utils d-flex justify-content-between">
                {/* writer name */}
                <span className="d-flex justify-content-center align-items-center">
                  <img src={writerIcon} alt="" className="writerIcon" />
                  {tutorial.authore}
                </span>
                {/* upload time */}
                <span className="d-flex justify-content-center align-items-center">
                  <img src={clockIcon} alt="" className="clockIcon" />
                  {getTime(tutorial.createdAt)}
                </span>
              </div>
              <div className="card-text mt-3 single-tutorial-card-text">
                {Parser(`${tutorial.desc}`)}
              </div>
            </div>
            {/* there will be the recommendation section */}
            <div className="col-12 col-md-2">hello</div>
          </div>
        )}
      </main>
    </>
  );
}

export default SingleTutorialSectionPage;
