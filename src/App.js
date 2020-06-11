import React, { useState } from "react";
import HealthCheck from "./components/HealthMonitor";
import IntervalSelector from "./components/IntervalSelector";
import Settings from "./components/Settings";
import initialConfig from "./config.json";

//Make sure that babel-polyfill is only required in once
// if (!global._babelPolyfill && !window._babelPolyfill) {
//   require("babel-polyfill");
// }
const DEFAULT_INTERVAL = 300; // seconds
function App() {
  let initialInterval = localStorage.getItem("healthcheck-interval");
  initialInterval =
    initialInterval > DEFAULT_INTERVAL ? initialInterval : DEFAULT_INTERVAL;
  const [interval, setInterval] = useState(
    initialInterval ? parseInt(initialInterval) : DEFAULT_INTERVAL
  );
  const [config, setConfig] = useState(initialConfig);
  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <IntervalSelector interval={interval} callback={setInterval} />
        <Settings initialConfig={config} setConfig={setConfig} />
      </div>
      <HealthCheck config={config} interval={interval} />
    </div>
  );
}

export default App;
