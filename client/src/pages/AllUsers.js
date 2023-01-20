import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Axios from "axios";

import deleteIcon from "../images/delete.png";
import editIcon from "../images/edit.png";
import viewIcon from "../images/view.png";

function AllUsers(props) {
  const navigate = useNavigate();
  const { progress } = props;

  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  progress(0);

  // fetching all the blog data from the server
  const fetchBlog = useCallback(async () => {
    progress(50);
    let res = await Axios.get("/user/allUsers");
    progress(80);
    if (res.status === 200) {
      setUsers(res.data);
      progress(100);
      setLoading(false);
    }
  }, [setUsers, progress, setLoading]);

  // edit post handler
  const handleClickEdit = (e) => {
    let _id = e.target.id;
    navigate(`/create/blog`, { state: { _id } });
  };
  // delete post handler
  const handleClickDelete = async (e) => {
    progress(0);
    setLoading(true);
    let postId = e.target.id;
    progress(30);
    let res = await Axios.delete(`/delete/blog/${postId}`);
    progress(50);
    if (res.status === 202) fetchBlog();
  };

  useEffect(() => {
    document.title = "All User | Futurisers";

    fetchBlog();
  }, [fetchBlog]);
  return (
    <>
      <main>
        {loading && <Loading />}
        {!loading && (
          <div className="container justify-content-center align-item-center mt-5 text-center ">
            <h1 className="h1 mb-5">All Blogs</h1>
            <table className="table table-success table-striped table-bordered">
              <thead className="table-warning">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Role</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, i) => {
                  return (
                    <>
                      <tr>
                        <th scope="row">{i + 1}</th>
                        {/* user Email */}
                        <td
                          className="text-start"
                          style={{ maxWidth: "100px" }}
                        >
                          {user.email}
                        </td>
                        {/* user phone */}
                        <td>{user.phone}</td>
                        {/* user role */}
                        <td>{user.role}</td>
                        {/* user delete */}
                        <td>
                          <img
                            src={deleteIcon}
                            title="delete"
                            className="deleteIcon"
                            id={`${user._id}`}
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={handleClickDelete}
                            alt="..."
                          />
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

export default AllUsers;
