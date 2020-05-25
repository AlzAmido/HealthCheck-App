import React, { useState } from "react";
import ReactModal from "react-modal";
import { Container } from "./components";

const CONFIG_KEY = "healthcheck-monitor-config";

export const Settings = ({ initialConfig, setConfig }) => {
  const currentConfig = localStorage.getItem(CONFIG_KEY);
  let config = currentConfig ? JSON.parse(currentConfig) : initialConfig;
  const [isOpen, toggleModal] = useState(false);
  const updateConfig = () => {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
    setConfig(config);
  };
  return (
    <Container>
      <button onClick={(e) => toggleModal(!isOpen)}>config</button>

      <ReactModal
        isOpen={isOpen}
        onAfterClose={updateConfig}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            position: "absolute",
            top: "40px",
            left: "40px",
            right: "40px",
            bottom: "40px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
        contentLabel={"Example Modal"}
        portalClassName={"ReactModalPortal"}
        overlayClassName={"ReactModal__Overlay"}
        id={"some-id"}
        className={"ReactModal__Content"}
        bodyOpenClassName={"ReactModal__Body--open"}
        htmlOpenClassName={"ReactModal__Html--open"}
        ariaHideApp={false}
        shouldFocusAfterRender={true}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        shouldReturnFocusAfterClose={true}
        role={"dialog"}
        parentSelector={() => document.body}
        aria={{
          labelledby: "heading",
          describedby: "full_description",
        }}
        data={{ background: "green" }}
      >
        <h1 style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Configuration</span>
          <button onClick={() => toggleModal(false)}>X</button>
        </h1>
      </ReactModal>
    </Container>
  );
};

export default Settings;
