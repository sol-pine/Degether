import axios from "axios";
import {SERVER_URL} from "../../shared/api";
import {handleError} from "../handleError";

/** 지원 수락 */
export async function postMember(myProjectId, userId) {
    axios.post(`${SERVER_URL}/api/addUser/${myProjectId}/${userId}`, {},
        {headers: {Authorization: sessionStorage.getItem("token")}}
    )
        .catch(error => handleError(error));
}
