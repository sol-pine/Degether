import {SERVER_URL} from "../../shared/api";
import axios from "axios";
import {handleError} from "../handleError";

// sse 연결
export function getConnection(userId) {
    const eventSource = new EventSource(`${SERVER_URL}/subscribe/${userId}`);
    eventSource.onopen = function () {
        axios.get(`${SERVER_URL}/api/readsse`, {
            headers: {Authorization: sessionStorage.getItem("token")}
        })
            .then(() => console.log('connect'))
            .catch(error => handleError(error));
    };
    eventSource.addEventListener("sse", function (e) {
        console.log(e);
    });
    eventSource.onerror = function (error) {
        console.error(error.message);
    };
}
