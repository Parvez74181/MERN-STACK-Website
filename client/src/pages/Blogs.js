import { useState, useEffect, useCallback, useRef } from "react";
import Blog from "../components/Blog";
import Loading from "../components/Loading";
import { useLocation } from "react-router-dom";
import Notification from "../components/Notification";
import Axios from "axios";

function Blogs(props) {
  const { progress } = props;
  const location = useLocation();
  const [notificationState, setNotificationState] = useState(false);
  const pageNumber = useRef(0);
  const [hasMore, setHasMore] = useState(true);
  progress(0);

  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState([]);

  const fetchData = useCallback(
    async (page) => {
      try {
        // fetching data
        let res = await Axios(`/blog?page=${page}`);
        if (res.status === 200) {
          // if res is completed then set hasMOre = false and display a complete message
          if (res.data.completed) {
            setHasMore(false);
            document.querySelector(".scrolling-completed-text").innerHTML =
              res.data.completed + " !";
            return;
          }

          setBlog(res.data);
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
    document.title = "Blogs | Futurisers";
    progress(30);
    fetchData(pageNumber.current);
    // this is for notification
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
          fetchData(pageNumber.current);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "500px" }
    );

    let card = document.querySelector(".card:last-child");
    observer.observe(card);
  }, [fetchData]);

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

  return (
    <>
      <main>
        {notificationState && (
          <Notification status="Success" data="Blog Created Successfully" />
        )}

        {loading && <Loading />}

        {!loading && (
          <>
            <div className="container flex mt-5 pt-5 blog-section">
              <Blog blog={blog} key={blog._id} />
            </div>

            {/* this is for showing the loading when infiniteScroll is sending request to the server */}
            {blog.length > 8 && (
              <div className="scrolling-completed-text mt-5 text-light text-muted text-center fs-5 text-muted">
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

export default Blogs;
