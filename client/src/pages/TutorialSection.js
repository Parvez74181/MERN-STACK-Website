import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback, useRef } from "react";
import Loading from "../components/Loading";
import Axios from "axios";
import getTime from "../components/GetTime";
import Parser from "html-react-parser";

import clockIcon from "../images/clock.png";
import writerIcon from "../images/writer.png";
import Notification from "../components/Notification";
import AOS from "../components/AnimateOnScroll";

function TutorialSection(props) {
  const { progress } = props;
  const { data } = useParams();
  const navigate = useNavigate();

  const [tutorialSectionData, setTutorialSectionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const pageNumber = useRef(0);

  const getTutorials = useCallback(
    async (page) => {
      try {
        let res = await Axios(`/tutorials/${data}?page=${page}`);
        if (res.status === 200) {
          if (res.data.completed) {
            setHasMore(false);
            document.querySelector(".scrolling-completed-text").innerHTML =
              res.data.completed + " !";
            return;
          }
          setTutorialSectionData(res.data);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    },
    [data]
  );

  useEffect(() => {
    getTutorials(pageNumber.current);
  }, []);

  const handleClick = (i) => {
    navigate(
      `/tutorial/${tutorialSectionData[i].title}/${tutorialSectionData[i]._id}`,
      {
        state: { tutorialSectionData, si: i },
      }
    );
  };

  // search data
  let searchInput = document.querySelector("#search-input");
  let searchButton = document.querySelector("#search-submit-btn");

  if (searchButton) {
    searchButton.addEventListener("click", async () => {
      // fetching data
      setLoading(true);
      progress(30);
      let res = await Axios(`/tutorials/${data}?search=${searchInput.value}`);
      progress(70);
      if (res.status === 200) {
        setTutorialSectionData(res.data);
        progress(100);
        setLoading(false);
      }
    });
  }

  // infinite scroll
  const handleScroll = useCallback(() => {
    let observer = new IntersectionObserver(
      (entrys) => {
        let entry = entrys[0];
        if (entry.isIntersecting) {
          pageNumber.current++;
          getTutorials(pageNumber.current);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "500px" }
    );

    let card = document.querySelector(".card:last-child");
    observer.observe(card);
  }, [getTutorials]);

  const debounce = (callback, delay) => {
    // Create a debounce function that delays the execution of the callback
    let timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => callback.apply(this, arguments), delay);
    };
  };

  useEffect(() => {
    // Bind an event handler to the scroll event of the window object
    if (hasMore) window.addEventListener("scroll", debounce(handleScroll, 100));

    // Return a cleanup function to remove the event handler when the component unmounts
    return () =>
      window.removeEventListener("scroll", debounce(handleScroll, 100));
  }, [handleScroll, hasMore]); // Only run this effect once, when the component mounts

  // animation on scrolling
  let cards = document.querySelectorAll(".card");
  AOS(cards);
  return (
    <>
      <main>
        {loading && <Loading />}
        {!loading && (
          <>
            <div className="container flex mt-5 pt-5 blog-section">
              {tutorialSectionData.map((data, i) => {
                const { title, desc, authore, _id, createdAt } = data;
                return (
                  <div className="card " style={{ width: "18rem" }} key={_id}>
                    <div className="card-body">
                      <div className="utils d-flex justify-content-between">
                        {/* writer name */}
                        <span className="d-flex justify-content-center align-items-center">
                          <img src={writerIcon} alt="" className="writerIcon" />
                          {authore}
                        </span>
                        {/* upload time */}
                        <span className="d-flex justify-content-center align-items-center">
                          <img src={clockIcon} alt="" className="clockIcon" />
                          {getTime(createdAt)}
                        </span>
                      </div>

                      <h5 className="card-title blog-title">{title} </h5>

                      <div className="card-text blog-description">
                        {Parser(`${desc}`)}
                      </div>

                      <button className="btn" onClick={() => handleClick(i)}>
                        Read More
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {tutorialSectionData.length > 8 && (
              <div className="scrolling-completed-text text-light text-center fs-5 mt-5 pt-5 text-muted">
                <span className="img-placeholder d-flex text-light justify-content-center align-items-center text-muted">
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  &nbsp; Loading New Content...
                </span>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}

export default TutorialSection;
