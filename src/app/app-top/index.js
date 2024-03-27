import React, { useEffect, useState } from "react";
import "./index.css";
const App = () => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [url, setUrl] = useState("");
  const fn = async () => {
    let is = await window.ipcR.ipcIsMaximized();
    setIsMaximized(!is);
  };
  useEffect(() => {
    setUrl(location.href);
  }, []);
  return (
    <>
      <div className="app-top">
        <div className="app-top-title">
          <div className="text">ElectronTitle</div>
          <div className="operate">
            <div className="min">
              <span onClick={window.ipcR.ipcMinimize}></span>
            </div>
            <div className={`${isMaximized ? "max" : "max2"}`}>
              <span
                onClick={() => {
                  fn();
                  isMaximized
                    ? window.ipcR.ipcUnmaximize()
                    : window.ipcR.ipcMaximize();
                }}
              ></span>
            </div>
            <div className="close">
              <span onClick={window.ipcR.ipcClose}></span>
            </div>
          </div>
        </div>
        <div className="app-top-main">
          <div className="app-top-main-history">
            <div className="home">home</div>
            <div className="left">left</div>
            <div className="right">right</div>
            <div className="refresh">refresh</div>
          </div>
          <div className="app-top-main-url">
            <input type="text" value={url} disabled />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
