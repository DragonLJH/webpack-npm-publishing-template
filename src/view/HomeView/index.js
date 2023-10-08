import "./index.scss"
import React, { useState, useEffect } from 'react';
import { homeViewRoutes, HomeViewComponent } from "../../route/index"
import { useHistory, useLocation, useParams } from "react-router-dom";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
function getItem(label, key, children, icon, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const HomeView = () => {
    const history = useHistory();
    const { pathname } = useLocation();
    const params = useParams();
    const [collapsed, setCollapsed] = useState(false);

    const [routes, useRoutes] = useState(homeViewRoutes.map(({ name, path }) => {
        return getItem(name, path)
    }))
    console.log(history, pathname, params)
    console.log("HomeView", routes)
    const menuClick = ({ key }) => {
        history.replace(key)
        console.log("menuClick", key)
    };
    return (
        <>
            <div className="home-view">
                <div className="home-view-left">
                    <Menu
                        defaultSelectedKeys={pathname}
                        mode="inline"
                        onClick={menuClick}
                        style={{
                            width: 200,
                        }}
                        items={routes}
                        inlineCollapsed={collapsed}
                    />
                </div>
                <div className="home-view-main">
                    <HomeViewComponent />
                </div>
            </div>
        </>
    )
}

export default HomeView;  