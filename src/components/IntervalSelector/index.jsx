import React from "react";

export const IntervalSelector = ({ interval, callback }) => {
  const updateInterval = (e) => {
    callback(e.target.value);
    localStorage.setItem("healthcheck-interval", e.target.value);
  };
  console.log(interval)
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "1rem",
        color: "#ececec",
      }}
    >
      <label style={{ paddingRight: ".5rem" }} htmlFor="updateInterval">
        Update Interval
      </label>
      <select name="updateInterval" defaultValue={interval} onChange={updateInterval}>
        <option value={10}>10s</option>
        <option value={15}>15s</option>
        <option value={20}>20s</option>
        <option value={25}>25s</option>
        <option value={30}>30s</option>
      </select>
    </div>
  );
};

export default IntervalSelector;
