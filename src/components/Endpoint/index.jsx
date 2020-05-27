import React, { useState, useEffect } from "react";
import Notification from "react-web-notification";
import axios from "axios";
import {
  Endpoint,
  EndpointContainer,
  GoButton,
  Loading,
  ResponseTime,
} from "./components";

const DEFAULT_INTERVAL = 30; // seconds

let ignoreNotifications = false;

const isUp = async (url, isHtml, interval) => {
  if (url) {
    try {
      const res = await axios.get(
        `http://localhost:3333${
          isHtml ? "/html" : "/"
        }?url=${url}&ttl=${interval}`,
        { timeout: (interval || DEFAULT_INTERVAL) * 1000 + 10 } // adding 10ms to make sure server-side ends first
      );
      console.log(res.headers["x-response-time"]);
      return {
        status: res.data === "OK" ? "green" : "red",
        time: res.headers["x-response-time"],
      };
    } catch {
      return { status: "red", time: 0 };
    }
  }
};

export default ({
  machineName,
  url,
  resourceName,
  mayReceiveWarnings,
  initialStatus,
  isHtml,
  interval,
}) => {
  const [state, setState] = useState({ status: initialStatus, time: 0 });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const run = async () => {
      const newState = await isUp(url, isHtml, interval || DEFAULT_INTERVAL);
      setState(newState);
      setLoading(false);
    };

    run();
    let currentTimeout = setInterval(() => {
      setLoading(true);
      run();
    }, (interval || DEFAULT_INTERVAL) * 1000);
    return () => {
      clearInterval(currentTimeout);
    };
  }, [interval, url]);
  return (
    <EndpointContainer
      key={`${machineName}-${resourceName}`}
      background={state.status}
    >
      <Endpoint>
        {resourceName}{" "}
        {state.time !== 0 && <ResponseTime>{state.time}</ResponseTime>}{" "}
      </Endpoint>

      <div style={{ display: "flex", flexDirection: "row" }}>
        {(!state.status || loading) && (
          <Loading
            type="Puff"
            color="#00BFFF"
            height={20}
            width={20}
            timeout={0}
          />
        )}
        {isHtml && (
          <GoButton href={url} target="_blank">
            Go to app
          </GoButton>
        )}
      </div>
      {state.status === "red" && (
        <Notification
          ignore={mayReceiveWarnings && ignoreNotifications}
          onClose={() => {
            ignoreNotifications = true;
          }}
          timeout={10000}
          title={`${machineName} ${resourceName} is down`}
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
  );
};
