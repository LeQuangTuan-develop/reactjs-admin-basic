import "./sidebar.css"
import {
    LineStyle,
    Timeline,
    TrendingUp,
    PermIdentity,
    Storefront,
    BarChart,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    WorkOutline,
    Report, 
    Feed
} from '@mui/icons-material';
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Bảng điều khiển</h3>
                    <ul className="sidebarList">
                    <Link to="/" className="link">
                        <li className="sidebarListItem active">
                            <LineStyle className="sidebarIcon" />
                            Trang chủ
                        </li>
                    </Link>
                    <li className="sidebarListItem">
                    <Timeline className="sidebarIcon" />
                    Thống kê
                    </li>
                    <li className="sidebarListItem">
                    <TrendingUp className="sidebarIcon" />
                    Sales
                    </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quản lý</h3>
                    <ul className="sidebarList">
                        <Link to="/users" className="link">
                            <li className="sidebarListItem">
                                <PermIdentity className="sidebarIcon" />
                                Khách hàng
                            </li>
                        </Link>
                        <Link to="/doctors" className="link">
                            <li className="sidebarListItem">
                                <Storefront className="sidebarIcon" />
                                Bác sĩ
                            </li>
                        </Link>
                        <Link to="/test" className="link">
                        <li className="sidebarListItem">
                            <Feed className="sidebarIcon" />
                            Bài viết
                        </li>
                        </Link>
                        <li className="sidebarListItem">
                            <BarChart className="sidebarIcon" />
                            Báo cáo
                        </li>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Thông báo</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <MailOutline className="sidebarIcon" />
                            email
                        </li>
                        <li className="sidebarListItem">
                            <DynamicFeed className="sidebarIcon" />
                            Phản hồi
                        </li>
                        <Link to="/messenger" className="link">
                        <li className="sidebarListItem">
                            <ChatBubbleOutline className="sidebarIcon" />
                            Tin nhắn
                        </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Nhân viên</h3>
                    <ul className="sidebarList">
                        <li className="sidebarListItem">
                            <WorkOutline className="sidebarIcon" />
                            Quản lý
                        </li>
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon" />
                            Phân tích
                        </li>
                        <li className="sidebarListItem">
                            <Report className="sidebarIcon" />
                            Báo cáo
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
