import axios from "axios";
import {SERVER_URL} from "../../shared/api";
import {handleError} from "../../shared/handleError";

/** 유저 정보 수정 */
export async function putUser(formData) {
    await axios.put(`${SERVER_URL}/user/userEdit`, formData, {
        headers: {
            Authorization: sessionStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
        }
    })
        .catch((error) => handleError(error));
}
