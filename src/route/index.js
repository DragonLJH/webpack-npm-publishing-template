import React, { useState } from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';



// 动态加载view根目录下的路由组件
const requireViewRoutes = require.context('../view', true, /index.(jsx|js)$/);

const viewRoutes = requireViewRoutes.keys().map(item => {
    const name = item.replace(/^\.\//, '').replace(/\/index.(jsx|js)$/, '')
    return { name, component: requireViewRoutes(item).default, path: `/${name}` }
}).filter(item => item.name.indexOf("/") == -1)
console.log("viewRoutes:%o", viewRoutes)


// 动态加载HomeView目录下的路由组件
const requireHomeViewRoutes = require.context('../view/HomeView', true, /index.(jsx|js)$/);
export const homeViewRoutes = requireHomeViewRoutes.keys().map(item => {
    const name = item.replace(/^\.\//, '').replace(/\/?index.(jsx|js)$/, '')
    return { name, component: requireHomeViewRoutes(item).default, path: `/${name}` }
}).filter(item => item.name).map(({ name, component, path }) => {
    return { name, component, path: `/HomeView${path}` }
})






// 动态添加路由
const DynamicRoute = ({ path, component }) => {
    return <Route path={path} component={component} />;
};

// 首页路由组件
export const HomeViewComponent = () => {
    const [routes, setRoutes] = useState(homeViewRoutes);
    return (
        <>
            <Router>
                {/* 路由配置 */}
                {routes.map((route, index) => {
                    return (
                        <DynamicRoute key={index} path={route.path} component={route.component} />
                    )
                })}
            </Router>
        </>
    );
}

// 根路由组件
const MyComponent = () => {
    const [routes, setRoutes] = useState(viewRoutes);

    const addRoute = () => {
        const newRoute = {
            path: '/dynamic',
            component: () => <div>Dynamic Route</div>,
        };
        setRoutes([...routes, newRoute]);
    };

    return (
        <>
            <Router>
                {/* 重定向登录页 */}
                <Route exact path="/">
                    <Redirect to="/LoginView" />
                </Route>
                {/* 路由配置 */}
                {routes.map((route, index) => {
                    return (
                        <DynamicRoute key={index} path={route.path} component={route.component} />
                    )
                })}
            </Router>
        </>
    );
};

export default MyComponent;