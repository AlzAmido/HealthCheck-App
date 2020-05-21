import React, { useState } from "react";
import HealthCheck from "./components/HealthMonitor";
import IntervalSelector from "./components/IntervalSelector";
import config from "./config.json";

//Make sure that babel-polyfill is only required in once
// if (!global._babelPolyfill && !window._babelPolyfill) {
//   require("babel-polyfill");
// }

function App() {
  const initialInterval = localStorage.getItem("healthcheck-interval");
  const [interval, setInterval] = useState(
    initialInterval ? parseInt(initialInterval) : 30
  );
  return (
    <div className="App">
      <IntervalSelector interval={interval} callback={setInterval} />
      <HealthCheck config={config} interval={interval} />
    </div>
  );
}

export default App;
