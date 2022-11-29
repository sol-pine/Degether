import React, {useEffect, useState, useCallback} from "react";
import {useInView} from "react-intersection-observer";
import {useDispatch, useSelector} from "react-redux";
import {getProjectPerPage} from "../redux/modules/ProjectSlice";
import {useNavigate} from "react-router-dom";
import {postZzim} from "../utils/apis/postZzim";
import {deleteZzim} from "../utils/apis/deleteZzim";

const Card = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const projectList = useSelector((state) => state.Project.list);
    const [ref, inView] = useInView();
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);

    // 프로젝트 리스트 받아오기, page가 바뀔 때마다 카드 18개씩 불러오기
    const getList = useCallback(async () => {
        setLoading(true);
        dispatch(getProjectPerPage(page));
        setLoading(false);
    }, [page]);

    // getList 가 바뀔 때 마다 함수 실행
    useEffect(() => {
        getList();
    }, [getList]);

    useEffect(() => {
        // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면 page +1
        if (projectList.length && inView && !loading) {
            setPage((prevState) => prevState + 1);
        }
    }, [inView, loading]);

    // 프로젝트 찜
    const zzim = (projectId) => postZzim(projectId)
        .then(() => window.location.replace("/"));

    // 프로젝트 찜 취소
    const cancelZzim = (projectId) => deleteZzim(projectId)
        .then(() => window.location.replace("/"));

    if (!projectList.length) {
        return <div className="no-search-data">관련 프로젝트가 없습니다.</div>;
    }
    return (
        <>
            {projectList.map((item, index) => {
                return (
                    <div
                        className="card-container"
                        key={index}
                        onClick={() => {
                            navigate(`/${item.projectId}`);
                        }}
                    >
                        <section>
                            <div className="dday">D-{item.dDay}</div>
                            {item.isZzim ? (
                                <img
                                    onClick={() => {
                                        cancelZzim(item.projectId);
                                    }}
                                    src="/img/ic-star-check.svg"
                                    alt="찜 아이콘"
                                    className="card-star"
                                />
                            ) : (
                                <img
                                    onClick={() => {
                                        zzim(item.projectId);
                                    }}
                                    src="/img/ic-star.svg"
                                    alt="찜 아이콘"
                                    className="card-star"
                                />
                            )}
                        </section>
                        {item.thumbnail ? (
                            <img src={item.thumbnail} className="card-image" alt="프로젝트 썸네일 이미지"/>
                        ) : (
                            <img src="/img/thumbnail.png" className="card-image" alt="프로젝트 썸네일 이미지"/>
                        )}
                        <div className="card-text">
                            {item.projectName} <br/>
                            <span>개발자 {item.devCount}명 / 디자이너 {item.deCount}명 모집 중</span>
                        </div>
                    </div>
                );
            })}
            <div ref={ref}>&#8203;</div>
        </>
    );
};
export default Card;
