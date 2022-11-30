import axios from "axios";
import {SERVER_URL} from "../../shared/api";
import {handleError} from "../handleError";

/** 프로젝트 지원 */
export async function postApply(projectId) {
    await axios.post(
        `${SERVER_URL}/api/projectApply/${projectId}`, {}, {
            headers: {Authorization: sessionStorage.getItem("token")},
        })
        .catch((error) => handleError(error));
}
