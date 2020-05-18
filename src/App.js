import React from "react";
import HealthCheck from "./components/HealthMonitor";
import config from "./config.json";

//Make sure that babel-polyfill is only required in once
// if (!global._babelPolyfill && !window._babelPolyfill) {
//   require("babel-polyfill");
// }

function App() {
  return (
    <div className="App">
      <HealthCheck config={config} />
    </div>
  );
}

export default App;
