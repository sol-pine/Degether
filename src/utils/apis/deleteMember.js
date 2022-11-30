import axios from "axios";
import {SERVER_URL} from "../../shared/api";
import {handleError} from "../handleError";

/** 팀원 강퇴 & 탈퇴 */
export async function deleteMember(projectId, userId) {
    await axios.delete(`${SERVER_URL}/api/kickUser/${myProjectId}/${userId}`, {
        headers: {Authorization: sessionStorage.getItem("token")}
    })
        .catch(error => handleError(error));
}