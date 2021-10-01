import SimpleLineChart from "../../components/chart/SimpleLineChart"
import SimpleBarChart from "../../components/chart/SimpleBarChart"
import FeatureInfo from "../../components/featuredInfo/FeatureInfo"
import "./home.css"
import {userData, data} from "../../dummyData"
import WidgetLg from "../../components/widgetLg/WidgetLg"
import WidgetSm from "../../components/widgetSm/WidgetSm"

export default function Home() {
    const color = ["#8884d8", "#82ca9d"]

    return (
        <div className="home">
            <FeatureInfo />
            <div className="chartbox">
                <SimpleLineChart data={userData} title="Thống kê khách hàng" dataKey={['Active User']} grid color={color}/>
                <SimpleBarChart data={data} title="Thống kê tào lao" dataKey={['uv', 'pv']} grid color={color}/>
            </div>
            <div className="homeWidgets">
                <WidgetSm />
                <WidgetLg />
            </div>
        </div>
    )
}
