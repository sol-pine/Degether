import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Information from "../components/Information";
import Members from "../components/Members";
import { SERVER_URL } from "../shared/api";
import { handleError } from "../shared/handleError";

const ProjectInfo = () => {
  const { myProjectId } = useParams();
  const [userData, setUserData] = useState(null);
  const [applyData, setApplyData] = useState(null);

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/projectMain/${myProjectId}`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUserData(response.data.result.user);
        setApplyData(response.data.result.applyUser);
      })
      .catch((error) => handleError(error));
  }, []);

  return (
    <div className="info-container">
      <Information />
      <div className="info-member-wrapper">
        <Members title={"프로젝트 팀원"} userData={userData} />
        <Members title={"프로젝트 지원자"} applyData={applyData} />
      </div>
    </div>
  );
};
export default ProjectInfo;
