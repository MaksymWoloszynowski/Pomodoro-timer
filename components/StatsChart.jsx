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
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 40 }}
        >
          <XAxis
            dataKey="label"
            interval={0}
            angle={-30}
            textAnchor="end"
            tick={{ fontSize: "clamp(10px, 2vw, 14px)" }}
          />
          <YAxis tick={{ fontSize: "clamp(10px, 2vw, 14px)" }} width={40} />
          <Tooltip />
          <Bar className="stats-chart-bar" dataKey="minutes" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsChart;
