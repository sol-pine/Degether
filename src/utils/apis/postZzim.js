import axios from "axios";
import {SERVER_URL} from "../../shared/api";
import {handleError} from "../../shared/handleError";

/** 프로젝트 찜 */
export async function postZzim(projectId) {
    await axios.post(`${SERVER_URL}/api/projectZzim/${projectId}`, {}, {
            headers: {Authorization: sessionStorage.getItem("token")},
        }
    )
        .catch((error) => handleError(error));
}
