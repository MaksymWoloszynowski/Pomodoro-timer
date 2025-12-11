import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StatsChart = ({ data }) => {
  return (
      <div className="stats-chart-wrapper">
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="label" tick={{ fontSize: 20 }} />
            <YAxis tick={{ fontSize: 20 }} />
            <Tooltip />
            <Bar dataKey="minutes" className="stats-chart-bar" />
          </BarChart>
        </ResponsiveContainer>
    </div>
  );
};

export default StatsChart;
