import "./chart.css"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

export default function SimpleLineChart({title, data, dataKey, grid, color}) {
    return (
        <div className="chart">
            <h3 className="chartTitle">{title}</h3>
            <ResponsiveContainer width="100%" aspect={5 / 2}>
                <LineChart
                    data={data}
                >
                    <XAxis dataKey="name" stroke="#5550bd"/>
                    <YAxis stroke="#5550bd"/>
                    <Tooltip />
                    {dataKey.map((key, index) => (<Line type="monotone" dataKey={key} stroke={color[index]}/>))}
                    {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
                    {dataKey.length > 1 && <Legend />}
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
