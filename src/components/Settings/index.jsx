import React, { useState } from "react";
import ReactModal from "react-modal";

export const Settings = (initialConfig) => {
  const currentConfig = localStorage.get("healthcheck-monitor-config");
  const config = currentConfig || initialConfig;
  const [isOpen, toggleModal] = useState(false);
  return (
    <>
      <button onClick={(e) => toggleModal(!isOpen)}>config</button>

      <ReactModal
        isOpen={
          isOpen
          /* Boolean describing if the modal should be shown or not. */
        }
        style={
          { overlay: {}, content: {} }
          /* Object indicating styles to be used for the modal.
   It has two keys, `overlay` and `content`.
   See the `Styles` section for more details. */
        }
        contentLabel={"Example Modal"}
        portalClassName={"ReactModalPortal"}
        overlayClassName={"ReactModal__Overlay"}
        id={"some-id"}
        className={"ReactModal__Content"}
        bodyOpenClassName={
          "ReactModal__Body--open"
          /* String className to be applied to the document.body 
   (must be a constant string).
   This attribute when set as `null` doesn't add any class 
   to document.body.
   See the `Styles` section for more details. */
        }
        htmlOpenClassName={
          "ReactModal__Html--open"
          /* String className to be applied to the document.html
   (must be a constant string).
   This attribute is `null` by default.
   See the `Styles` section for more details. */
        }
        ariaHideApp={
          true
          /* Boolean indicating if the appElement should be hidden */
        }
        shouldFocusAfterRender={
          true
          /* Boolean indicating if the modal should be focused after render. */
        }
        shouldCloseOnOverlayClick={
          true
          /* Boolean indicating if the overlay should close the modal */
        }
        shouldCloseOnEsc={
          true
          /* Boolean indicating if pressing the esc key should close the modal
   Note: By disabling the esc key from closing the modal
   you may introduce an accessibility issue. */
        }
        shouldReturnFocusAfterClose={
          true
          /* Boolean indicating if the modal should restore focus to the element
   that had focus prior to its display. */
        }
        role={
          "dialog"
          /* String indicating the role of the modal, allowing the 'dialog' role
   to be applied if desired.
   This attribute is `dialog` by default. */
        }
        parentSelector={
          () => document.body
          /* Function that will be called to get the parent element
   that the modal will be attached to. */
        }
        aria={
          {
            labelledby: "heading",
            describedby: "full_description",
          }
          /* Additional aria attributes (optional). */
        }
        data={
          { background: "green" }
          /* Additional data attributes (optional). */
        }
        // overlayRef={
        //   setOverlayRef
        //   /* Overlay ref callback. */
        // }
        // contentRef={
        //   setContentRef
        //   /* Content ref callback. */
        // }
      >
        <p>Modal Content</p>
      </ReactModal>
    </>
  );
};
