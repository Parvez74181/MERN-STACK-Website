import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Axios from "axios";

import deleteIcon from "../images/delete.png";
import editIcon from "../images/edit.png";
import viewIcon from "../images/view.png";

function AllDocumentation(props) {
  const navigate = useNavigate();
  const { progress } = props;
  const [documentationData, setDocumentationData] = useState(null);
  const [loading, setLoading] = useState(true);
  progress(0);

  // fetching all the documentation data from the server
  const fetchDocumentation = useCallback(async () => {
    progress(50);
    let res = await Axios("/all/documentation");
    progress(80);

    if (res.status === 200) {
      setDocumentationData(res.data);
      progress(100);
      setLoading(false);
    }
  }, [setDocumentationData, progress, setLoading]);

  // edit post handler
  const handleClickEdit = (e) => {
    let _id = e.target.id;
    navigate(`/create/documentation`, { state: { _id } });
  };

  // delete post handler
  const handleClickDelete = async (e) => {
    progress(0);
    setLoading(true);
    let postId = e.target.id;
    progress(30);
    let res = await Axios.delete(`/delete/documentation/${postId}`);
    progress(50);
    if (res.status === 202) fetchDocumentation();
  };

  useEffect(() => {
    document.title = "All Documentations | Futurisers";
    // document.body.style = "background: #F2E7C3 !important";
    fetchDocumentation();
  }, [fetchDocumentation]);
  return (
    <>
      <main>
        {" "}
        {loading && <Loading />}
        {!loading && (
          <div className="container justify-content-center align-item-center mt-5 text-center ">
            <h1 className="h1 mb-5">All Documentations</h1>
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
                {documentationData.map((blog, i) => {
                  return (
                    <>
                      <tr>
                        <th style={{ width: "3rem" }} scope="row">
                          {i + 1}
                        </th>
                        {/* blog title */}
                        <td>
                          <Link
                            to={`/documentation/${blog.title}/${blog._id}`}
                            style={{
                              cursor: "pointer",
                              display: "-webkit-box",
                              overflow: "hidden",
                              WebkitLineClamp: "1",
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {blog.title}
                          </Link>
                        </td>
                        {/* edit icon */}
                        <td style={{ width: "5rem" }}>
                          <img
                            src={editIcon}
                            title="edit"
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

export default AllDocumentation;
