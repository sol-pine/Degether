import React, { lazy, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Spinner from "../../Spinner";
import { SERVER_URL } from "../../../shared/api";

const TeamMember = lazy(() => {
  return Promise.all([
    import("./TeamMember"),
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]).then(([moduleExports]) => moduleExports);
});

function TeamMembers() {
  const { myProjectId } = useParams();
  const [projectMembersData, setProjectMembersData] = useState(null);
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
        if (res.data.result.user) {
          setProjectMembersData(res.data.result.user);
        }
      })
      .catch((error) => console.error(error.message));
  }, []);

  return (
    <MemberBoxWrap>
      <Suspense fallback={<Spinner />}>
        <TeamMember
          projectMembersData={projectMembersData}
          projectData={projectData}
        ></TeamMember>
      </Suspense>
    </MemberBoxWrap>
  );
}
export default TeamMembers;
const MemberBoxWrap = styled.div`
  width: 421px;
  min-height: 43px;
  padding: 16px;
  display: flex;
  flex-flow: row wrap;
  gap: 15px;
`;
