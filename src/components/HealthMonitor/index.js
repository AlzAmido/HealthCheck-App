import React, { useState } from "react";
import {
  HealthCheckContainer,
  EndpointContainer,
  EnvironmentContainer,
} from "./components";

export const initialiseState = (config) => {
  let initialState = {};
  config.map(({ name, endpoints }) => {
    initialState[name] = {};
    endpoints.map(({ resourceName }) => {
      initialState[name][resourceName] = "yellow";
    });
  });
  return initialState;
};

export const HealthCheck = ({ config }) => {
  const [state, setState] = useState(initialiseState(config));
  return (
    <HealthCheckContainer>
      {config.map(({ name, endpoints }) => (
          <EnvironmentContainer key={name} >
            <h3>{name}</h3>
            {endpoints.map(({ url, resourceName, mayReceiveWarnings }) => (
              <EndpointContainer key={`${name}-${resourceName}`} background={state[name][resourceName]}>
                {resourceName}
              </EndpointContainer>
            ))}
          </EnvironmentContainer>
      ))}
    </HealthCheckContainer>
  );
};

export default HealthCheck;
