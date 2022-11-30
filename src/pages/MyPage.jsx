import React, {useMemo, useState} from "react";
import Profile from "../elements/Profile";
import ProjectList from "../elements/ProjectList";
import "../style/my.css";
import {getUser} from "../utils/apis/getUser";

const MyPage = () => {
    // 유저 정보 조회
    const [userInfo, setUserInfo] = useState(null);
    getUser().then((response) => setUserInfo(response?.data.result))

    const {myProjects, zzimProjects} = useMemo(() => ({
        myProjects: userInfo?.myProject,
        zzimProjects: userInfo?.zzim,
    }), [userInfo]);

    return (
        <div className="my-container">
            <Profile userInfo={userInfo}/>
            <ProjectList list={myProjects} title="참여 프로젝트"/>
            <ProjectList list={zzimProjects} title="관심 프로젝트"/>
        </div>
    );
};
export default MyPage;
