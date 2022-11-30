import axios from "axios";
import {SERVER_URL} from "../../shared/api";
import {handleError} from "../handleError";

/** 유저 정보 조회 */
export async function getUser() {
    await axios.get(`${SERVER_URL}/user/userInfo`, {
        headers: {
            Authorization: sessionStorage.getItem("token"),
        }
    })
        .catch((error) => handleError(error));
}