import { useNavigate } from "react-router-dom";
import Parser from "html-react-parser";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import getTime from "../components/GetTime";

import clockIcon from "../images/clock.png";
import writerIcon from "../images/writer.png";
import AOS from "./AnimateOnScroll";

function Blogs(props) {
  const navigate = useNavigate();
  const { blog } = props;

  const handleClick = (i) => {
    navigate(`/blog/${blog[i].title}/${blog[i]._id}`);
  };

  let cards = document.querySelectorAll(".card");
  AOS(cards);
  return (
    <>
      {blog.map((blog, i) => {
        return (
          <>
            <div className="card " style={{ width: "18rem" }} key={blog._id}>
              <div className="img-box">
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
                    <img src={writerIcon} alt="" className="writerIcon" />
                    {blog.authore}
                  </span>
                  {/* upload time */}
                  <span className="d-flex justify-content-center align-items-center">
                    <img src={clockIcon} alt="" className="clockIcon" />
                    {getTime(blog.createdAt)}
                  </span>
                </div>

                <h5 className="card-title blog-title">{blog.title} </h5>

                <div className="card-text blog-description">
                  {Parser(`${blog.desc}`)}
                </div>

                <button className="btn" onClick={() => handleClick(i)}>
                  Read More
                </button>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}

export default Blogs;
