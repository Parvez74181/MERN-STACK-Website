import { useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Documentation from "../components/Documentation";
import Axios from "axios";
import Notification from "../components/Notification";
import Loading from "../components/Loading";
import AOS from "../components/AnimateOnScroll";

function Documentations(props) {
  const { progress } = props;
  progress(0);

  const location = useLocation();

  const [documentation, setDocumentation] = useState([]);
  const [notificationState, setNotificationState] = useState(null);
  const [loading, setLoading] = useState(true);
  const pageNumber = useRef(0);
  const [hasMore, setHasMore] = useState(true);

  // fetching data from the database
  const fetchDocumentation = useCallback(
    async (page) => {
      try {
        // data fetching
        let res = await Axios.get(`/documentation?page=${page}`);
        if (res.status === 200) {
          let data = res.data.documentation;
          // if res is completed then set hasMOre = false and display a complete message
          if (res.data.completed) {
            setHasMore(false);
            document.querySelector(".scrolling-completed-text").innerHTML =
              res.data.completed + " !";
            return;
          }
          setDocumentation(data);
          progress(100);
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    },
    [progress]
  );

  useEffect(() => {
    document.title = "Documentation | Futurisers";
    progress(30);
    progress(50);
    fetchDocumentation(pageNumber.current);
    if (location.state) {
      setNotificationState(true);
    }
  }, []); // Only run this effect once, when the component mounts

  const handleScroll = useCallback(() => {
    let observer = new IntersectionObserver(
      (entrys) => {
        let entry = entrys[0];
        if (entry.isIntersecting) {
          pageNumber.current++;
          fetchDocumentation(pageNumber.current);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "500px" }
    );

    let card = document.querySelector(".card:last-child");
    observer.observe(card);
  }, [fetchDocumentation]);

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
        {notificationState && (
          <Notification
            status="Success"
            data="Documentation Created Successfully"
          />
        )}
        {loading && <Loading />}
        {!loading && (
          <>
            <div className="container flex my-5 pt-5 blog-section">
              <Documentation documentation={documentation} />
            </div>

            {documentation.length > 8 && (
              <div className="scrolling-completed-text text-light text-center fs-5 text-muted">
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

export default Documentations;
