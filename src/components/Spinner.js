import React from "react";
import { ClipLoader } from "react-spinners";
function Spinner() {
  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <ClipLoader></ClipLoader>
      </div>
    </div>
  );
}
export default Spinner;
