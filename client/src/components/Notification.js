import { useEffect } from "react";

function Notification(props) {
  // for hiding notification on click on the close icon
  const hideNotification = () => {
    let alert_box = document.querySelector(".alert-box");
    alert_box.style.transform = "translate(150%)";
  };
  useEffect(() => {
    const progress = () => {
      let progress = document.querySelector(".progress");
      let alert_box = document.querySelector(".alert-box");

      if (props) {
        alert_box.style.transform = "translate(0%)"; // show the notificatoin alert box
        progress.classList.remove("active"); // remove active class from the progress bar to show the progress
      }

      setTimeout(() => {
        alert_box.style.transform = "translate(0%)";
        progress.classList.add("active");
      }, 50); // after 50 milisecond show the notification alert box

      setTimeout(() => {
        hideNotification();
      }, 5000); // after 5 second hide the ntification
    };
    progress();
  }, [props]);

  return (
    <>
      <div
        className={`alert-box mt-4 ${
          props.status === "Success" ? "bg-msg-success" : "bg-msg-danger"
        }`}
      >
        {/* icon */}
        <div className="alert-container p-2">
          {props.status === "Success" ? (
            <svg
              class="checkmark-success"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                class="checkmark-success-circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                class="checkmark-success-check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          ) : (
            <svg
              class="checkmark-danger"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                class="checkmark-danger-circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                class="checkmark-danger-check"
                fill="none"
                d="M14.1 14.1l23.8 23.8 m0,-23.8 l-23.8,23.8"
              />
            </svg>
          )}

          <div className="alert-details ps-3">
            {/* status */}

            <div
              className={`status ${
                props.status === "Success" ? "text-success" : "text-danger"
              }`}
            >
              {props.status}
            </div>

            {/* message */}
            <div
              className={`message ${
                props.status === "Success" ? "text-success" : "text-danger"
              }`}
            >
              {props.data}
            </div>
          </div>
          <i className="fa-solid fa-x" onClick={hideNotification}></i>
        </div>
        {/* progress bar */}
        <div className="progress"></div>
      </div>
    </>
  );
}

export default Notification;
