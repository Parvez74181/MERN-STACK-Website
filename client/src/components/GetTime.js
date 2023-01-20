const getTime = (createdAt) => {
  let time;
  let now = new Date().getTime();
  let timeleft = now - new Date(createdAt);

  let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
  let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

  if (days > 0) time = `${days} Days Ago`;
  if (days === 0 && hours > 0) time = `${hours} Hours Ago`;
  if (days === 0 && hours === 0 && minutes > 0) time = `${minutes} Minutes Ago`;
  if (days === 0 && hours === 0 && minutes === 0 && seconds > 0)
    time = `${seconds} Seconds Ago`;
  return time;
};
export default getTime;
