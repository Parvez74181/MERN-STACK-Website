import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Loading from "../components/Loading";
import getTime from "../components/GetTime";
import Axios from "axios";
import Parser from "html-react-parser";

import clockIcon from "../images/clock.png";
import writerIcon from "../images/writer.png";

import codeCopy from "../components/CodeCopy";

function SingleDocumentationPage(props) {
  const { progress } = props;
  const [loading, setLoading] = useState(true);
  const [documentation, setDocumentation] = useState([]);

  const { _id } = useParams();

  const navigate = useNavigate();

  progress(0);

  // fetching data
  const fetchData = useCallback(async () => {
    try {
      let res = await Axios.get(`/single-documentation-page/${_id}`);
      document.title = `${res.data.title} | Futurisers.com`;

      setDocumentation(res.data); // set blog = documents.current[si]

      setLoading(false); // set loading false

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
        {loading && <Loading />}
        {!loading && (
          <div className="row">
            <div
              className="container-fluid col-12 col-md-7 my-4 px-0"
              style={{ maxWidth: "80%" }}
            >
              <h2 className="card-title mb-3">{documentation.title}</h2>
              <div className="utils d-flex justify-content-between">
                {/* writer name */}
                <span className="authore d-flex justify-content-center align-items-center">
                  <img src={writerIcon} alt="..." className="writerIcon" />
                  {documentation.authore}
                </span>
                {/* upload time */}
                <span className="time d-flex justify-content-center align-items-center">
                  <img src={clockIcon} alt="..." className="clockIcon" />
                  {getTime(documentation.createdAt)}
                </span>
              </div>
              <div className="card-text mt-5 single-documentation-card-text">
                {Parser(`${documentation.desc}`)}
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

export default SingleDocumentationPage;
