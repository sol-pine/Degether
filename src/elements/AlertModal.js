import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { alertApply, seeDetail } from "../redux/modules/ModalSlice";

const AlertModal = (props) => {
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);
  return (
    <div
      className="modal-background"
      onClick={() => {
        props.closeModal();
      }}
    >
      <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        <p>{props.message}</p>
        <button
          className="input-btn"
          onClick={() => {
            props.closeModal();
            window.location.replace("");
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
};
export default AlertModal;
