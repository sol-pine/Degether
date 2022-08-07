import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProjectDetail from "../components/ProjectDetail";
import ProjectInput from "../components/ProjectInput";
import { letsCreate } from "../redux/modules/ModalSlice";

export const CardCreateModal = (props) => {
  const dispatch = useDispatch();
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
        dispatch(letsCreate(false));
      }}
    >
      <div className="card-modal-body" onClick={(e) => e.stopPropagation()}>
        <ProjectInput />
      </div>
    </div>
  );
};

export const CardDetailModal = (props) => {
  const navigate = useNavigate();
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
        navigate("/");
      }}
    >
      <div className="card-modal-body" onClick={(e) => e.stopPropagation()}>
        <ProjectDetail />
      </div>
    </div>
  );
};
