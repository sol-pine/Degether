import * as StompJS from "stompjs";
import * as SockJS from "sockjs-client";
import {useDispatch} from "react-redux";
import {addChat, getChat} from "../../redux/modules/ChatSlice";
import {SERVER_URL} from "../../shared/api";

const dispatch = useDispatch();
const token = {Authorization: sessionStorage.getItem("token")};
let client = null;

// 채팅 소켓 연결
const useSocket = (myProjectId) => {
    connect();
    dispatch(getChat(myProjectId));
    return () => client.disconnect()
};


// SUBSCRIBE (connect ===> 이후 subscribe (chat room 구독))
const subscribe = (myProjectId) => {
    client.subscribe(`/sub/chat/room/${myProjectId}`,
        function (chat) {
            dispatch(addChat(JSON.parse(chat.body)));
        },
        token
    );
};

const onError = error => console.log(error.message)

const connect = () => {
    const sock = new SockJS(`${SERVER_URL}/wss/chat`);
    client = StompJS.over(sock);
    client.connect(token, subscribe, onError);
};

export default useSocket()