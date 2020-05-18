import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import axios from "axios";
import Notification from "react-web-notification";
import {
  HealthCheckContainer,
  EndpointContainer,
  EnvironmentContainer,
  Endpoint,
} from "./components";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
let notifications = false
const initialiseState = (config) => {
  let initialState = {};
  config.forEach(({ name, endpoints }) => {
    initialState[name] = {};
    endpoints.forEach(({ resourceName }) => {
      initialState[name][resourceName] = null;
    });
  });
  console.log("initialiseState");
  return initialState;
};

const isUp = async (url) => {
  try {
    const res = await axios.get(`http://localhost:3333/?url=${url}`);
    return res.data === "OK";
  } catch {
    return false;
  }
};

const checkState = async (config, state) => {
  config.forEach(async ({ name, endpoints }) => {
    endpoints.forEach(async ({ url, resourceName }) => {
      state[name][resourceName] = (await isUp(url)) ? "green" : "red";
    });
  });
};

export const HealthCheck = ({ config }) => {
  const initialState = () => initialiseState(config);
  const [state] = useState(initialState);
  const [i, setIteration] = useState(0);

  useEffect(() => {
    let timeout;
    checkState(config, state);
    timeout = setTimeout(() => setIteration(i + 1), 10000);
    return () => {
      clearTimeout(timeout);
    };
  }, [i]);

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
              {!state[name][resourceName] && (
                <Loader
                  // style={{ marginLeft: "1rem" }}
                  type="Puff"
                  color="#00BFFF"
                  height={20}
                  width={20}
                  timeout={6000}
                />
              )}
              {state[name][resourceName] === "red" && (
                <Notification
                  ignore={notifications}
                  onClose={()=>{notifications = true}}
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
