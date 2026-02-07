import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ReviewPieChart = ({ reviews }) => {
  const ratingCounts = [1, 2, 3, 4, 5].map(
    (star) => reviews.filter((r) => r.rating === star).length
  );

  const data = {
    labels: ["1 ★", "2 ★", "3 ★", "4 ★", "5 ★"],
    datasets: [
      {
        data: ratingCounts,
        backgroundColor: [
          "#ef4444",
          "#f97316",
          "#eab308",
          "#22c55e",
          "#16a34a",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ maxWidth: "320px", margin: "auto" }}>
      <Pie data={data} />
    </div>
  );
};

export default ReviewPieChart;
