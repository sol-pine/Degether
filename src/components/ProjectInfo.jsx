import React, {useMemo} from "react";
import {useParams} from "react-router-dom";
import Information from "./Information";
import Members from "./Members";
import {getProjectInfo} from "../utils/apis/getProjectInfo";

const ProjectInfo = () => {
    const {myProjectId} = useParams();
    const projectInfo = getProjectInfo(myProjectId);

    const {team, applicants} = useMemo(() => ({
        team: projectInfo?.user,
        applicants: projectInfo?.applyUser
    }), [])

    return (
        <div className="info-container">
            <Information/>
            <div className="info-member-wrapper">
                <Members title="프로젝트 팀원" team={team}/>
                <Members title="프로젝트 지원자" applicants={applicants}/>
            </div>
        </div>
    );
};
export default ProjectInfo;
