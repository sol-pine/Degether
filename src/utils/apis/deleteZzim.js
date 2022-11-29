import axios from "axios";
import {SERVER_URL} from "../../shared/api";
import {handleError} from "../../shared/handleError";

/** 프로젝트 찜 취소 */
export async function deleteZzim(projectId) {
    await axios.delete(`${SERVER_URL}/api/projectZzim/${projectId}`, {
        headers: {Authorization: sessionStorage.getItem("token")},
    })
        .catch((error) => handleError(error));
}