import "./chart.css"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

export default function SimpleBarChart({ title, data, dataKey, grid, color }) {
    return (
        <div className="chart">
            <h3 className="chartTitle">{title}</h3>
            <ResponsiveContainer width="100%" aspect={5 / 2}>
                <BarChart
                    data={data}
                >
                    <XAxis dataKey="name" stroke="#5550bd" />
                    <YAxis stroke="#5550bd" />
                    <Tooltip />
                    {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
                    {dataKey.map((key, index) => (<Bar dataKey={key} fill={color[index]} />))}
                    {dataKey.length > 1 && <Legend />}
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}