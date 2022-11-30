import axios from "axios";
import {SERVER_URL} from "../../shared/api";
import {handleError} from "../handleError";

/** 프로젝트 상세 조회 */
export async function getProjectDetail(projectId) {
    await axios.get(`${SERVER_URL}/api/project/${projectId}`)
        .catch((error) => handleError(error));
}