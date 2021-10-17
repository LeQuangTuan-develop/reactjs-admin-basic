import React, { useContext } from 'react'
import './topbar.css'
import { NotificationsNone, Language, Settings } from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';
import { Logout } from '../../context/AuthAction';
import { Link } from 'react-router-dom';

export default function Topbar() {
    const {user, dispatch} = useContext(AuthContext)

    const handleLogout = () => {
        dispatch(Logout())
    }

    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <Link to={`/`}>
                    <span className="logo">Admin</span>
                    </Link>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <NotificationsNone fontSize="large" />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language fontSize="large" />
                    </div>
                    <div className="topbarIconContainer">
                        <Settings fontSize="large" />
                    </div>
                    <div className="topbarAcount">
                        <img src={user.img} 
                        alt="" className="topAvatar" />
                        <ul className="topbarListItem">
                            <li className="topbarItem">Tài khoản của tôi</li>
                            <li className="topbarItem">Ngôn ngữ</li>
                            <li className="topbarItem">Cài đặt</li>
                            <li className="topbarItem" onClick={handleLogout}>Đăng xuất</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
