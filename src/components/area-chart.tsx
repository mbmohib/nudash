import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function App() {
  return (
    <ResponsiveContainer width="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <Legend
          layout="horizontal"
          verticalAlign="top"
          align="right"
          height={80}
        />
        <CartesianGrid stroke="#42427980" strokeDasharray="3 3" />
        <XAxis stroke="#ffffff80" dataKey="name" />
        <YAxis stroke="#ffffff80" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stackId="1"
          stroke="#8F2DE290"
          fill="#8F2DE290"
        />

        <Area
          type="monotone"
          dataKey="amt"
          stackId="1"
          stroke="#246FFF90"
          fill="#246FFF90"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
