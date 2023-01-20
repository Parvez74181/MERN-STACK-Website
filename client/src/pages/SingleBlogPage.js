import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Loading from "../components/Loading";
import Axios from "axios";

import getTime from "../components/GetTime";
import codeCopy from "../components/CodeCopy";
import Parser from "html-react-parser";
import NextPreviousButton from "../components/NextPreviousButton";

import clockIcon from "../images/clock.png";
import writerIcon from "../images/writer.png";

function SingleBlogPage(props) {
  const { progress } = props;
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState([]);

  const { _id } = useParams();

  const navigate = useNavigate();

  props.progress(0);

  // fetching data
  const fetchData = useCallback(async () => {
    try {
      let res = await Axios.get(`/single-blog-page/${_id}`);
      document.title = `${res.data.title} | Futurisers.com`;
      setBlog(res.data);
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

  // let loadTime =
  //   window.performance.timing.domContentLoadedEventEnd -
  //   window.performance.timing.navigationStart; // getting the page loading time
  // setTimeout(() => {
  //   // rest of the code from here is for goto next post or goto previous post
  //   let nextButton = document.querySelector(".next"); // select nextButton
  //   let previousButton = document.querySelector(".previous"); // select previousButton
  //   if (si.current === blogs.current.length - 1) {
  //     nextButton.classList.add("disabled"); // if the si number and the blogs.current.length - 1 then disable the nextButton
  //   } else {
  //     nextButton.classList.remove("disabled"); // else remove disable from nextButton
  //   }

  //   if (si.current === 0) {
  //     previousButton.classList.add("disabled"); // if the si number = 0 then disable the previousButton
  //   } else {
  //     previousButton.classList.remove("disabled"); // else remove disable from previousButton
  //   }
  //   nextButton.addEventListener("click", () => {
  //     si.current++; // increase the si number to fetch the next post
  //     console.log(blogs.current[si.current]);
  //     // navigate to the single-blog-page and set the state blog = all blogs and si number = after increased si number
  //     navigate(
  //       `/blog/${blogs.current[si.current].title}/${
  //         blogs.current[si.current]._id
  //       }`,
  //       {
  //         state: { blog: blogs.current, si },
  //       }
  //     );
  //   });

  //   previousButton.addEventListener("click", () => {
  //     si.current--; // decrease the si number to fetch the previous post

  //     // navigate to the single-blog-page and set the state blog = all blogs and si number = after decreased si number
  //     navigate(
  //       `/blog/${blogs.current[si.current].title}/${
  //         blogs.current[si.current]._id
  //       }`,
  //       {
  //         state: { blog: blogs.current, si },
  //       }
  //     );
  //   });
  // }, loadTime);

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
              <h2 className="card-title mb-3">{blog.title}</h2>

              <img
                title="image"
                className="col-12 rounded img-fluid mb-3 mx-auto"
                loading="lazy"
                src={blog.thumbnail}
                style={{ minWidth: "100%" }}
                alt=""
              />

              <div className="utils d-flex justify-content-between">
                {/* writer name */}
                <span className="authore d-flex justify-content-center align-items-center">
                  <img src={writerIcon} alt="" className="writerIcon" />
                  {blog.authore}
                </span>
                {/* upload time */}
                <span className="time d-flex justify-content-center align-items-center">
                  <img src={clockIcon} alt="..." className="clockIcon" />
                  {getTime(blog.createdAt)}
                </span>
              </div>
              <div className="card-text mt-3 single-blog-card-text">
                {Parser(`${blog.desc}`)}
              </div>

              <NextPreviousButton id={blog._id} component={"blog"} />
            </div>
            {/* there will be the recommendation section */}
            <div className="col-12 col-md-2">hello</div>
          </div>
        )}
      </main>
    </>
  );
}

export default SingleBlogPage;
