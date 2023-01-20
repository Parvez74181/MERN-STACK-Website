import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Axios from "axios";
import Loading from "../components/Loading";
import Notification from "../components/Notification";

function Tutorial(props) {
  const { progress } = props;
  const [loading, setLoading] = useState(true);
  const [tutorialSection, setTutorialSection] = useState([]);
  const [notificationState, setNotificationState] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  progress(0);
  // getting categories from server
  const getTutorialSection = useCallback(async () => {
    try {
      let res = await Axios.get(`/category/tutorialSection`);
      let data = res.data.category;
      data.forEach((data) => {
        let value = data.tutorialSection;
        setTutorialSection(tutorialSection.push(value));
        setTutorialSection([...new Set(tutorialSection)]); // creating a new array basis on every unique data and set into state
      });
      setLoading(false);
      progress(100);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    document.title = "Tutorials | Futurisers";
    progress(30);
    progress(50);
    getTutorialSection();
    // this is for notification
    if (location.state) {
      setNotificationState(true);
    }
  }, []);

  return (
    <>
      <main>
        {notificationState && (
          <Notification status="Success" data="Tutorial Created Successfully" />
        )}
        {loading && <Loading />}
        {!loading && (
          <div
            className="container d-flex justify-content-center align-items-center text-center my-5"
            style={{ minHeight: "70vh" }}
          >
            <div className="row tutorial-section">
              {tutorialSection.map((data, i) => {
                return (
                  <Link
                    to={`/tutorial/${data}`}
                    className="col-10 col-md-2 p-4 rounded-3 text-light fs-5"
                    key={i}
                  >
                    {data}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default Tutorial;
