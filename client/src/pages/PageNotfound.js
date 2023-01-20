import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PageNotfound(props) {
  const { progress } = props;
  const navigate = useNavigate();
  progress(0);

  useEffect(() => {
    document.title = "404 Page Not Found | Futurisers";
    progress(100);
  }, [progress]);
  return (
    <>
      <main>
        <div
          className="pagenotfound d-flex justify-content-center flex-column align-items-center text-center"
          style={{
            height: "70vh",
          }}
        >
          <div className="code">
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </div>
          <p>Page Not Found</p>
          <button className="btn" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </main>
    </>
  );
}

export default PageNotfound;
