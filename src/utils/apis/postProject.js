import axios from "axios";
import {SERVER_URL} from "../../shared/api";

/** 새로운 프로젝트 등록 */
export async function postProject (formData) {
    await axios.post(`${SERVER_URL}/api/project`, formData, {
            headers: {Authorization: sessionStorage.getItem("token")},
            "Content-Type": "multipart/form-data",
        })
}