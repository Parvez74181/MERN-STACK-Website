import { Link } from "react-router-dom";
import React, { useEffect } from "react";

import plusIcon from "../images/plus.png";
import usersIcon from "../images/all-users.png";

import blogIcon from "../images/blog.png";
import tutorialIcon from "../images/tutorial.png";
import documentationIcon from "../images/documentation.png";
import analysisIcon from "../images/analysis.png";

function Backend(props) {
  const { progress } = props;
  progress(0);

  useEffect(() => {
    document.title = "Backend | Futurisers";

    progress(100);
  }, [progress]);

  // TODO: need to get token from the login and access to use backend
  let token = true;
  const links = [
    { link: "/create/blog", uri: plusIcon, title: "Create Blog" },
    {
      link: "/create/documentation",
      uri: plusIcon,
      title: "Create Documentation",
    },
    { link: "/create/tutorials", uri: plusIcon, title: "Create Tutorial" },
    { link: "/analysis", uri: analysisIcon, title: "Analysis" },
    { link: "/all-users", uri: usersIcon, title: "All Users" },
    { link: "/all-blogs", uri: blogIcon, title: "All Blogs" },
    { link: "/all-tutorials", uri: tutorialIcon, title: "All Tutorials" },
    {
      link: "/all-documentations",
      uri: documentationIcon,
      title: "All Documentations",
    },
  ];
  return (
    <>
      {token && (
        <>
          <main>
            <div
              className="container text-center my-5 d-flex justify-content-around flex-column"
              style={{ minHeight: "70vh" }}
            >
              <h1 className="h1">Admin Panel</h1>
              <div className="row backend" style={{ width: "100%" }}>
                {links.map((item) => {
                  return (
                    <>
                      <Link
                        to={item.link}
                        className="col-8 col-md-3 col-lg-2 p-4 d-flex flex-column justify-content-center align-items-center fs-5 backend-box rounded-4 backend-link"
                      >
                        <img
                          src={item.uri}
                          alt=""
                          style={{ maxWidth: "40px" }}
                        />
                        {item.title}
                      </Link>
                    </>
                  );
                })}
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default Backend;
