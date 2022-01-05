import {
  Bar,
  BarChart,
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
      <BarChart
        data={data}
        margin={{
          top: 60,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <Legend layout="horizontal" verticalAlign="top" align="right" />
        <CartesianGrid stroke="#42427980" strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#ffffff80" />
        <YAxis stroke="#ffffff80" />
        <Tooltip
          wrapperStyle={{
            borderRadius: '16px',
          }}
          cursor={{ fill: '#191934' }}
          contentStyle={{
            background: '#191934',
            border: 'none',
            borderRadius: '8px',
          }}
        />

        <Bar dataKey="pv" fill="#F7CE4690" />
        <Bar dataKey="uv" fill="#5C159490" />
      </BarChart>
    </ResponsiveContainer>
  );
}
