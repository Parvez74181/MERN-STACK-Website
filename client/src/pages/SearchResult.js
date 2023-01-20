import { useState, useEffect, useCallback } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Parser from "html-react-parser";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "../components/Loading";
import Axios from "axios";

import notFoundIcon from "../images/not-found.png";
import getTime from "../components/GetTime";

import clockIcon from "../images/clock.png";
import writerIcon from "../images/writer.png";

function SearchResult(props) {
  const { progress } = props;
  progress(0);
  const [blogData, setBlogData] = useState([]);
  const [tutorialData, setTutorialData] = useState([]);
  const [documentationData, setDocumentationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasContent, setHasContent] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const { path, value } = useParams();

  const setData = useCallback(async () => {
    try {
      let value = location.state.value; // get the value from the state
      progress(70);
      if (path === "blog") {
        let res = await Axios(`/search/${path}?search=${value}`);
        if (res.status === 200) {
          if (res.data.length === 0) setHasContent(false);
          setBlogData(res.data);
          setLoading(false);
          progress(100);
          return;
        }
      } else if (path === "tutorial") {
        let res = await Axios(`/search/${path}?search=${value}`);
        if (res.status === 200) {
          if (res.data.length === 0) setHasContent(false);
          setTutorialData(res.data);
          setLoading(false);
          progress(100);
          return;
        }
      } else if (path === "documentation") {
        let res = await Axios(`/search/${path}?search=${value}`);
        if (res.status === 200) {
          if (res.data.length === 0) setHasContent(false);
          setDocumentationData(res.data);
          setLoading(false);
          progress(100);
          return;
        }
      } else {
        let res = await Axios(`/search/all?search=${value}`);
        if (res.status === 200) {
          const { blog, tutorial, documentation } = res.data;
          if (
            blog.length === 0 &&
            tutorial.length === 0 &&
            documentation.length === 0
          )
            setHasContent(false);
          setBlogData(blog);
          setTutorialData(tutorial);
          setDocumentationData(documentation);
          setLoading(false);
          progress(100);
          return;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [location.state, path]);

  useEffect(() => {
    progress(40);
    setData();
  }, [setData]);

  return (
    <>
      <main>
        {loading && <Loading />}
        {!loading && (
          <>
            <div className="text-light text-center mt-5 fs-5 text-muted tracking-in-expand">
              Showing results for : &nbsp;&nbsp;{"'" + value + "'"}
            </div>

            <div className="container flex pt-5 blog-section">
              {/* this section is for showing blogs results */}
              {blogData.length > 0 &&
                blogData.map((blog, i) => {
                  // TODO
                  return (
                    <>
                      <div
                        className="card "
                        style={{ width: "18rem" }}
                        key={blog._id}
                      >
                        <div className={`img-box`}>
                          <span className="img-placeholder d-flex text-light justify-content-center align-items-center ">
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            &nbsp; Loading...
                          </span>

                          <LazyLoadImage
                            title="image" // this is basically used for a normal tooltip
                            className="card-img-top"
                            effect="blur"
                            src={blog.thumbnail}
                          />
                        </div>

                        <div className="card-body">
                          <div className="utils d-flex justify-content-between">
                            {/* writer name */}
                            <span className="d-flex justify-content-center align-items-center">
                              <img
                                src={writerIcon}
                                alt=""
                                className="writerIcon"
                              />
                              {blog.authore}
                            </span>
                            {/* upload time */}
                            <span className="d-flex justify-content-center align-items-center">
                              <img
                                src={clockIcon}
                                alt=""
                                className="clockIcon"
                              />
                              {getTime(blog.createdAt)}
                            </span>
                          </div>

                          <h5 className="card-title blog-title">
                            {blog.title}{" "}
                          </h5>

                          <div className="card-text blog-description">
                            {Parser(`${blog.desc}`)}
                          </div>

                          <button
                            className="btn"
                            onClick={() => {
                              navigate(`/blog/${blog.title}/${blog._id}`);
                            }}
                          >
                            Read More
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })}

              {/* this section is for showing tutorials results */}
              {tutorialData.length > 0 &&
                tutorialData.map((tutorial, i) => {
                  // TODO
                  return (
                    <>
                      <div
                        className="card "
                        style={{ width: "18rem" }}
                        key={tutorial._id}
                      >
                        <div className="card-body">
                          <div className="utils d-flex justify-content-between">
                            {/* writer name */}
                            <span className="d-flex justify-content-center align-items-center">
                              <img
                                src={writerIcon}
                                alt=""
                                className="writerIcon"
                              />
                              {tutorial.authore}
                            </span>
                            {/* upload time */}
                            <span className="d-flex justify-content-center align-items-center">
                              <img
                                src={clockIcon}
                                alt=""
                                className="clockIcon"
                              />
                              {getTime(tutorial.createdAt)}
                            </span>
                          </div>

                          <h5 className="card-title blog-title">
                            {tutorial.title}{" "}
                          </h5>

                          <div className="card-text blog-description">
                            {Parser(`${tutorial.desc}`)}
                          </div>

                          <button
                            className="btn"
                            onClick={() => {
                              navigate(
                                `/tutorial/${tutorial.title}/${tutorial._id}`
                              );
                            }}
                          >
                            Read More
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })}

              {/* this section is for showing documentation results */}
              {documentationData.length > 0 &&
                documentationData.map((documentation, i) => {
                  // TODO
                  return (
                    <>
                      <div
                        className="card "
                        style={{ width: "18rem" }}
                        key={documentation._id}
                      >
                        <div className="card-body">
                          <div className="utils d-flex justify-content-between">
                            {/* writer name */}
                            <span className="d-flex justify-content-center align-items-center">
                              <img
                                src={writerIcon}
                                alt=""
                                className="writerIcon"
                              />
                              {documentation.authore}
                            </span>
                            {/* upload time */}
                            <span className="d-flex justify-content-center align-items-center">
                              <img
                                src={clockIcon}
                                alt=""
                                className="clockIcon"
                              />
                              {getTime(documentation.createdAt)}
                            </span>
                          </div>

                          <h5 className="card-title blog-title">
                            {documentation.title}
                          </h5>

                          <div className="card-text blog-description">
                            {Parser(`${documentation.desc}`)}
                          </div>

                          <button
                            className="btn"
                            onClick={() => {
                              navigate(
                                `/documentation/${documentation.title}/${documentation._id}`
                              );
                            }}
                          >
                            Read More
                          </button>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </>
        )}
        {!hasContent && (
          <div
            className="d-flex justify-content-center align-items-center flex-column text-light text-muted text-center fs-4"
            style={{ height: "50vh" }}
          >
            <img className="scale-in-center" src={notFoundIcon} alt="" />
            <br />
            <span className="tracking-in-expand">Sorry! No Results Found!</span>
          </div>
        )}
      </main>
    </>
  );
}

export default SearchResult;
