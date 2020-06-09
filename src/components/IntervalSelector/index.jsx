import React from "react";
import { Container } from "./components";

export const IntervalSelector = ({ interval, callback }) => {
  const updateInterval = (e) => {
    callback(e.target.value);
    localStorage.setItem("healthcheck-interval", e.target.value);
  };
  console.log(interval);
  return (
    <Container>
      <label htmlFor="updateInterval">
        Update Interval
      </label>
      <select
        name="updateInterval"
        defaultValue={interval}
        onChange={updateInterval}
      >
        <option value={60}>1min</option>
        <option value={120}>2min</option>
        <option value={300}>5min</option>
        <option value={600}>10min</option>
        <option value={900}>15min</option>
        <option value={1800}>30min</option>
      </select>
    </Container>
  );
};

export default IntervalSelector;
