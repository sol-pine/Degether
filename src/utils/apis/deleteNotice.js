import axios from "axios";
import {SERVER_URL} from "../../shared/api";
import {handleError} from "../handleError";

// 알림 삭제
export async function deleteNotice(notificationId) {
    await axios.delete(`${SERVER_URL}/api/sse/${notificationId}`, {
        headers: {Authorization: sessionStorage.getItem("token")},
    })
        .then(() => window.location.replace(""))
        .catch(error => handleError(error));
}
