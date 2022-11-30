import axios from "axios";
import {SERVER_URL} from "../../shared/api";
import {handleError} from "../handleError";

/** 프로젝트 정보 조회 */
export async function getProjectInfo(myProjectId) {
    await axios.get(`${SERVER_URL}/api/projectMain/${myProjectId}`, {
        headers: {Authorization: sessionStorage.getItem("token")}
    })
        .then ((response) => {return response.data.result})
        .catch((error) => handleError(error));
}
