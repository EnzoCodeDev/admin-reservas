import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "", Total: 0 },
  { name: "Enero", Total: 2 },
  { name: "Febrero", Total: 4 },
  { name: "Marzo", Total: 5 },
  { name: "Abril", Total: 3 },
  { name: "Mayo", Total: 1 },
  { name: "Junio", Total: 0 },
  { name: "Julio", Total: 1 },
  { name: "Agosto", Total: 2 },
  { name: "Septiembre", Total: 6 },
  { name: "Noviembre", Total: 4 },
  { name: "Diciembre", Total: 5 },
];

const Chart = ({ aspect}) => {
  return (
    <div className="chart">
      <div className="title">Usuarios nuevos (2024)</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={200}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
