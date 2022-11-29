import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import "../style/modal.css";
import AlertModal from "../elements/AlertModal";
import {getProjectDetail} from "../utils/apis/getProjectDetail";
import {postApply} from "../utils/apis/postApply";

const ProjectDetail = () => {
    const navigate = useNavigate();
    const {projectId} = useParams();
    const [detail, setDetail] = useState(null);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const types = ["앱", "웹", "게임", "메타버스"];

    // 프로젝트 상세 조회
    useEffect(() => {
        getProjectDetail(projectId)
            .then((response) => {
                setDetail(response?.data.result)
                setLoading(false)
            })
    }, [projectId]);

    // 프로젝트 지원
    const applyProject = () => {
        postApply(projectId)
            .then(() => setModal(true));
    }

    if (loading) {
        return <div>loading...</div>;
    }
    return (
        <div className="project-input-container">
            {modal ? (
                <AlertModal
                    closeModal={() => setModal(!modal)}
                    message={
                        "프로젝트에 지원하였습니다. 곧 프로젝트 담당자가 확인 후 결과를 알려드립니다."
                    }
                />
            ) : null}
            {detail.thumbnail ? (
                <img className="preview-image" src={detail.thumbnail} alt="미리보기"/>
            ) : (
                <img className="preview-image" src="/img/thumbnail.png" alt="썸네일"/>
            )}

            <div className="project-input-wrapper">
                프로젝트 명
                <input
                    type="text"
                    placeholder="2글자 이상 20글자 이하"
                    value={detail.projectName}
                />
            </div>
            <div className="project-input-wrapper">
                프로젝트 타입
                {types.map((item, index) => {
                    return (
                        <div className="type-input" key={index}>
                            <input
                                type="radio"
                                name="type"
                                value={item}
                                checked={detail.type.includes(item)}
                            />
                            {item}
                        </div>
                    );
                })}
            </div>
            <div className="project-input-wrapper area">
                프로젝트 설명
                <textarea
                    placeholder="2글자 이상 50글자 이하"
                    maxLength="50"
                    value={detail.projectDescription}
                />
            </div>
            <div className="project-input-wrapper">
                모집 인원
                <section>
                    <div className="type-input">
                        개발자
                        <input
                            className="number"
                            type="number"
                            min={0}
                            value={detail.devCount}
                        />
                    </div>
                    <div className="type-input">
                        디자이너
                        <input
                            className="number"
                            type="number"
                            min={0}
                            value={detail.deCount}
                        />
                    </div>
                </section>
            </div>
            <div className="project-input-wrapper">
                모집 마감일
                <input className="date" type="date" value={detail.deadline}/>
            </div>
            <div className="btn-wrapper">
                <button
                    className="input-btn bold"
                    onClick={() => applyProject()}
                >
                    지원하기
                </button>
                <button
                    onClick={() => navigate("/")}
                    className="input-btn"
                >
                    취소
                </button>
            </div>
        </div>
    );
};
export default ProjectDetail;
