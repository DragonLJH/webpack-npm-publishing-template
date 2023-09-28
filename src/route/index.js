import React, { useState } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';



// 动态加载路由组件
const requireRoutes = require.context('../view', true, /index.(jsx|js)$/);
const routeComponents = requireRoutes.keys().map((fileName) => {
    const routePath = fileName.replace(/^\.\//, '').replace(/\/index.(jsx|js)$/, '');
    const component = requireRoutes(fileName).default;
    return {
        path: `/${routePath}`,
        component,
    };
});
console.log(routeComponents)
// 动态添加路由
const DynamicRoute = ({ path, component }) => {
    return <Route path={path} component={component} />;
};

const MyComponent = () => {
    const [routes, setRoutes] = useState(routeComponents);

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
                {/* 路由配置 */}
                {routes.map((route, index) => (
                    <DynamicRoute key={index} path={route.path} component={route.component} />
                ))}
            </Router>
        </>
    );
};

export default MyComponent;