import { useEffect, useCallback } from "react";
import { Chart } from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";
import Axios from "axios";

function Analysis() {
  const fetchData = useCallback(async () => {
    let res = await Axios.get("/analysis");
    if (res.status === 200) {
      let daily = document.querySelector("#daily");
      let monthly = document.querySelector("#monthly");
      let yearly = document.querySelector("#yearly");
      let visitors = [];
      let days = [];
      let months = [];
      let years = [];
      res.data.forEach((data) => {
        days.push(data.day);
        months.push(data.month);
        years.push(data.year);
        visitors.push(data.visitorsCount);
        if (months.includes(data.month)) {
          console.log("TODO"); // TODO
        }
      });

      chart(daily, days, "Daily Visitors", visitors);
      chart(monthly, months, "Monthly Visitors", visitors);
      chart(yearly, years, "Yearly Visitors", visitors);
    }
  }, []);

  const chart = (ctx, labelsData, labelName, visitors) => {
    const labels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    const data = {
      labels: labelName === "Monthly Visitors" ? labels : labelsData,
      datasets: [
        {
          label: labelName,
          data: visitors,
          fill: false,
          borderColor: "#34dc8f",
          tension: 0.1,
        },
      ],
    };
    new Chart(ctx, {
      type: "line",
      data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  useEffect(() => {
    document.title = "Analysis | Futurisers.com";
    fetchData();
  }, [fetchData]);

  return (
    <>
      <main>
        <div
          style={{ width: "100vw" }}
          className="container gap-5 d-flex justify-content-center align-items-center flex-wrap"
        >
          <canvas
            className="mt-5"
            style={{ maxWidth: "40rem", maxHeight: "20rem" }}
            id="daily"
          ></canvas>
          <canvas
            className="mt-5"
            style={{ maxWidth: "40rem", maxHeight: "20rem" }}
            id="monthly"
          ></canvas>
          <canvas
            className="mt-5"
            style={{ maxWidth: "40rem", maxHeight: "20rem" }}
            id="yearly"
          ></canvas>
        </div>
      </main>
    </>
  );
}

export default Analysis;
