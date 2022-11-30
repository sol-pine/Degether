import axios from "axios";
import {SERVER_URL} from "../../shared/api";
import {handleError} from "../handleError";

// sse 알림 수신
export async function getNotice() {
    await axios.get(`${SERVER_URL}/api/sse`, {
        headers: {Authorization: sessionStorage.getItem("token")}
    })
        .then(response => {
            return response.data.result
        })
        .catch(error => handleError(error));
}
