import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Axios from "axios";

import deleteIcon from "../images/delete.png";
import editIcon from "../images/edit.png";
import viewIcon from "../images/view.png";

function AllTutorials(props) {
  const navigate = useNavigate();
  const { progress } = props;
  const [tutorialData, setTutorialData] = useState(null);
  const [loading, setLoading] = useState(true);
  progress(0);

  // fetching all the blog data from the server
  const fetchBlog = useCallback(async () => {
    progress(50);
    let res = await Axios("/all/tutorial");
    progress(80);
    console.log(res);
    if (res.status === 200) {
      setTutorialData(res.data);
      progress(100);
      setLoading(false);
    }
  }, [setTutorialData, progress, setLoading]);

  // edit post handler
  const handleClickEdit = (e) => {
    let _id = e.target.id;
    navigate(`/create/tutorials`, { state: { _id } });
  };
  // delete post handler
  const handleClickDelete = async (e) => {
    progress(0);
    setLoading(true);
    let postId = e.target.id;
    progress(30);
    let res = await Axios.delete(`/delete/tutorial/${postId}`);
    progress(50);
    if (res.status === 202) fetchBlog();
  };

  useEffect(() => {
    document.title = "All blog | Futurisers";
    // document.body.style = "background: #F2E7C3 !important";
    fetchBlog();
  }, [fetchBlog]);
  return (
    <>
      <main>
        {" "}
        {loading && <Loading />}
        {!loading && (
          <div className="container justify-content-center align-item-center mt-5 text-center ">
            <h1 className="h1 mb-5">All Tutorials</h1>
            <table className="table table-success table-striped table-bordered">
              <thead className="table-warning">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col" style={{ width: "40rem" }}>
                    Details
                  </th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                  <th scope="col">views</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {tutorialData.map((blog, i) => {
                  return (
                    <>
                      <tr>
                        <th style={{ width: "3rem" }} scope="row">
                          {i + 1}
                        </th>
                        {/* blog title */}
                        <td>
                          <Link
                            to={`/tutorial/${blog.title}/${blog._id}`}
                            style={{
                              cursor: "pointer",
                              display: "-webkit-box",
                              overflow: "hidden",
                              webkitLineClamp: "1",
                              webkitBoxOrient: "vertical",
                            }}
                          >
                            {blog.title}
                          </Link>
                        </td>
                        {/* edit icon */}
                        <td style={{ width: "5rem" }}>
                          <img
                            title="edit"
                            src={editIcon}
                            className="editIcon"
                            id={`${blog._id}`}
                            style={{ cursor: "pointer" }}
                            onClick={handleClickEdit}
                            alt="..."
                          />
                        </td>
                        {/* delete icon */}
                        <td style={{ width: "5rem" }}>
                          <img
                            src={deleteIcon}
                            title="delete"
                            className="deleteIcon"
                            id={`${blog._id}`}
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={handleClickDelete}
                            alt="..."
                          />
                        </td>
                        {/* views */}
                        <td style={{ width: "7rem" }}>
                          <img
                            src={viewIcon}
                            title="views"
                            className="viewIcon"
                            alt="..."
                          />
                          &nbsp; {blog.views}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}

export default AllTutorials;
