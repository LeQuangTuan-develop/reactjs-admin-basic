import React from 'react'
import './topbar.css'
import { NotificationsNone, Language, Settings } from '@mui/icons-material';

export default function Topbar() {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">Admin</span>
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
                    <img src="https://s120-ava-talk.zadn.vn/c/6/8/a/16/120/45150d249a53a683034b9facc71958fb.jpg" 
                    alt="" className="topAvatar" />
                </div>
            </div>
        </div>
    )
}
