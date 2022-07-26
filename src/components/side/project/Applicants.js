import axios from "axios";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { SERVER_URL } from "../../../shared/api";
import Spinner from "../../Spinner";

const Applicant = lazy(() => {
  return Promise.all([
    import("./Applicant"),
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]).then(([moduleExports]) => moduleExports);
});
function Applicants() {
  const { myProjectId } = useParams();
  const [applicantsData, setApplicantsData] = useState(null);
  const [projectData, setProjectData] = useState(null);
  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/projectMain/${myProjectId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setProjectData(res.data.result);
        if (res.data.result.applyUser) {
          setApplicantsData(res.data.result.applyUser);
        }
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <MemberBoxWrap>
      <Suspense fallback={<Spinner />}>
        <Applicant
          applicantsData={applicantsData}
          projectData={projectData}
        ></Applicant>
      </Suspense>
    </MemberBoxWrap>
  );
}
export default Applicants;
const MemberBoxWrap = styled.div`
  width: 421px;
  min-height: 43px;
  padding: 16px;
  display: flex;
  flex-flow: row wrap;
  gap: 15px;
`;
