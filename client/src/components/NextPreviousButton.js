import Axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function NextPreviousButton(props) {
  const [dataId, setDataId] = useState([]);

  let navigate = useNavigate();

  const getNextPost = async () => {
    let res = await Axios.get(`/${props.id}/next/${props.component}`); // for next post
    if (res.status === 200) {
      setDataId([...dataId, res.data]);
      console.log(dataId);
    }
  };
  const getPrevPost = async () => {
    let res = await Axios.get(`/${props.id}/previous/${props.component}`); // for previous post
    if (res.status === 200) {
      setDataId([...dataId, res.data]);
      console.log(dataId);
    }
  };
  useEffect(() => {
    getNextPost();
    getPrevPost();
  }, []);
  return (
    <>
      <div className="buttons mt-5 d-flex justify-content-between">
        {/* previous button */}
        <button
          className={`previous btn d-inline-flex justify-content-center align-items-center `}
          style={{ width: "7rem" }}
        >
          <i className="fa-solid fa-arrow-left"></i> &nbsp; previous
        </button>
        {/* next button */}
        <button
          className={`next btn d-inline-flex justify-content-center align-items-center`}
          style={{ width: "7rem" }}
          onClick={() => {
            navigate(`/blog/${dataId[0].title}/${dataId[0]._id}`);
          }}
        >
          next &nbsp; <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </>
  );
}

export default NextPreviousButton;
