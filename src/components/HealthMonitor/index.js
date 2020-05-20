import React from "react";
import Notification from "react-web-notification";
import {
  HealthCheckContainer,
  EndpointContainer,
  EnvironmentContainer,
  Endpoint,
  GoButton,
  Loading
} from "./components";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import useZonesReducer from "./zones-reducer";

let notifications = false;

export const HealthCheck = ({ config }) => {
  const { state } = useZonesReducer(config);
  return (
    <HealthCheckContainer>
      {config.map(({ name, endpoints }) => (
        <EnvironmentContainer key={name}>
          <h3>{name}</h3>
          {endpoints.map(({ url, resourceName, mayReceiveWarnings }) => (
            <EndpointContainer
              key={`${name}-${resourceName}`}
              background={state[name][resourceName]}
            >
              <Endpoint>{resourceName}</Endpoint>
              <div style={{display:"flex", flexDirection:"row"}}>
                {!state[name][resourceName] && (
                  <Loading
                    type="Puff"
                    color="#00BFFF"
                    height={20}
                    width={20}
                    timeout={0}
                  />
                )}
                <GoButton href={url} target="_blank">
                  Go to app
                </GoButton>
              </div>
              {state[name][resourceName] === "red" && (
                <Notification
                  ignore={notifications}
                  onClose={() => {
                    notifications = true;
                  }}
                  timeout={10000}
                  title={`${name} ${resourceName} is down`}
                  options={{
                    tag: Date.now(),
                    body: new Date(),
                    icon: null,
                    lang: "en",
                    dir: "ltr",
                  }}
                />
              )}
            </EndpointContainer>
          ))}
        </EnvironmentContainer>
      ))}
    </HealthCheckContainer>
  );
};

export default HealthCheck;
