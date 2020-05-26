import React from "react";
import { HealthCheckContainer, EnvironmentContainer } from "./components";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Endpoint from "../Endpoint";

export const HealthCheck = ({ config, interval }) => (
  <HealthCheckContainer>
    {config.map(({ name, endpoints }) => (
      <EnvironmentContainer key={name}>
        <h3>{name}</h3>
        {endpoints.map((item) => (
          <Endpoint
            key={item.resourceName}
            interval={interval}
            machineName={name}
            url={item.url}
            resourceName={item.resourceName}
            initialState={null}
            mayReceiveWarnings={item.mayReceiveWarnings}
          />
        ))}
      </EnvironmentContainer>
    ))}
  </HealthCheckContainer>
);

export default HealthCheck;
