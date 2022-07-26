import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

function Spinner() {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50vw",
          height: "50vh",
        }}
      >
        <ClipLoader color="green" />
      </div>
    </>
  );
}
export default Spinner;
