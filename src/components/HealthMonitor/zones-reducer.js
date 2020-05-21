import { useReducer, useEffect } from "react";
import axios from "axios";

 const INTERVAL = 30 //seconds

const initialiseState = (config) => {
  let initialState = {};
  config.forEach(({ name, endpoints }) => {
    initialState[name] = {};
    endpoints.forEach(({ resourceName }) => {
      initialState[name][resourceName] = null;
    });
  });
  return initialState;
};

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
const flattenZones = (zones) =>
  zones
    .map((zone) =>
      zone.endpoints.map((endpoint) => ({
        ...endpoint,
        sandBoxName: zone.name,
      }))
    )
    .reduce((acc, next) => acc.concat(next), []);

const reducer = (state, action) => {
  switch (action.type) {
    case "SET":
      const { sandBoxName, resourceName, status } = action.payload;
      return {
        ...state,
        [sandBoxName]: {
          ...state[sandBoxName],
          [resourceName]: status,
        },
      };
  }
};
const useCheckState = (config, interval) => {
  const initialState = () => initialiseState(config); //not great
  const initState = initialState();
  const [state, dispatch] = useReducer(reducer, initState);
  const zones = flattenZones(config);

  useEffect(() => {
    const run = () => {
      zones.map(async (machine) => {
        const status = (await isUp(machine.url)) ? "green" : "red";
        dispatch({ type: "SET", payload: { ...machine, status } });
      });
    };

    run();
    setInterval(() => {
      run();
    }, (interval || INTERVAL) * 1000);
  }, [interval]);

  return { state };
};

export default useCheckState;
