import React, { useState, useEffect } from "react";
import Notification from "react-web-notification";
import axios from "axios";
import { Endpoint, EndpointContainer, GoButton, Loading } from "./components";

let ignoreNotifications = false;

const isUp = async (url) => {
  if (url) {
    try {
      const res = await axios.get(`http://localhost:3333/?url=${url}`);
      return res.data === "OK";
    } catch {
      return false;
    }
  }
};

export default ({
  machineName,
  url,
  resourceName,
  mayReceiveWarnings,
  initialStatus,
  interval,
}) => {
  const [state, setState] = useState(initialStatus);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const run = async () => {
      const newState = (await isUp(url)) ? "green" : "red";
      setState(newState);
      setLoading(false);
    };

    run();
    let currentTimeout = setInterval(() => {
      setLoading(true);
      run();
    }, (interval || 30) * 1000);
    return () => {
      clearInterval(currentTimeout);
    };
  }, [interval, url]);
  return (
    <EndpointContainer
      key={`${machineName}-${resourceName}`}
      background={state}
    >
      <Endpoint>{resourceName}</Endpoint>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {(!state || loading) && (
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
      {state === "red" && (
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
