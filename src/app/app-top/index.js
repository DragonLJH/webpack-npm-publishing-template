import React, { useEffect, useState, useContext, useRef } from "react";
import "./index.css";
import { useHistory, useLocation } from "react-router-dom";
const AppTop = () => {
  const l = useLocation();
  const h = useHistory();
  const operate = useRef(null);
  const [operateCount, setOperateCount] = useState(0);
  const [isMaximized, setIsMaximized] = useState(false);
  const [url, setUrl] = useState("");
  const setIsMaximizedFn = async () => {
    let is = await window.ipcR.ipcIsMaximized(l.pathname);
    setIsMaximized(!is);
  };
  useEffect(() => {
    setUrl(location.href);
  }, [l.pathname]);
  useEffect(() => {
    let childElementCount = operate?.current?.childElementCount;
    if (childElementCount) setOperateCount(childElementCount);
  }, [operate.current]);
  return (
    <>
      <div className="app-top">
        <div className="app-top-title">
          <div className="text">ElectronTitle</div>
          <div className="region-drag"></div>
          <div
            className="operate"
            ref={operate}
            style={{
              "--w": `${operateCount * 50 + (operateCount - 1) * 10}px`,
            }}
          >
            <div className="more-button">
              <span onClick={() => {}}></span>
            </div>
            <div className="min">
              <span onClick={window.ipcR.ipcMinimize}></span>
            </div>
            <div className={`${isMaximized ? "max" : "max2"}`}>
              <span
                onClick={(e) => {
                  e.preventDefault();
                  setIsMaximizedFn();
                  isMaximized
                    ? window.ipcR.ipcUnmaximize(l.pathname)
                    : window.ipcR.ipcMaximize(l.pathname);
                }}
              ></span>
            </div>
            <div className="close">
              <span onClick={() => window.ipcR.ipcClose(l.pathname)}></span>
            </div>
          </div>
        </div>
        <div className="app-top-main">
          <div className="app-top-main-history">
            <div className="home" onClick={() => h.push("/")}></div>
            <div className="left" onClick={() => h.goBack()}></div>
            <div className="right" onClick={() => h.goForward()}></div>
            <div className="refresh" onClick={() => {}}></div>
          </div>
          <div className="app-top-main-url">
            <input type="text" value={url} disabled />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppTop;
