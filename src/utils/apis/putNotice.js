import axios from "axios";
import {SERVER_URL} from "../../shared/api";
import {handleError} from "../handleError";

// 알림 확인 처리
export async function putNotice(notificationId) {
    await axios.put(`${SERVER_URL}/api/sse/${notificationId}`, {
        headers: {Authorization: sessionStorage.getItem("token")}
    })
        .then(() => window.location.replace(""))
        .catch((error) => handleError(error));
}