import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

function Spinner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let timeout = setTimeout(() => setShow(true), 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <>
      {show && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <ClipLoader color="green" />
        </div>
      )}
    </>
  );
}
export default Spinner;
