import React, { useEffect, useState } from "react";
import "../style/chat.css";
import { useParams } from "react-router-dom";
import { OpenVidu } from "openvidu-browser";
import userModel from "openvidu-react/dist/models/user-model";
import { useBeforeunload } from "react-beforeunload";
import { useDispatch, useSelector } from "react-redux";
import { createSession, createViduToken } from "../redux/modules/ViduSlice";
import Video from "../components/Video";

const VideoChat = () => {
  const dispatch = useDispatch();
  const viduToken = useSelector((state) => state.Vidu.viduToken);
  const { myProjectId } = useParams();
  const [session, setSession] = useState(null);
  const [nickname, setNickname] = useState("");
  const [OV, setOV] = useState(null);
  const [cam, setCam] = useState(true);
  const [mainCam, setMainCam] = useState(null);
  const [mic, setMic] = useState(false);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);

  let _subscribers = [];
  let _sessionCreated = false;
  const localUser = new userModel();
  localUser.setVideoActive(true);
  localUser.setAudioActive(false);

  // 1 joinSession => openvidu 객체 생성
  // 2 setSession(OV.initSession())
  // 3 session listener 등록, getToken
  // 4 getDevice , setPublisher(),
  // 5 session.publish(publisher)

  useBeforeunload((event) => {
    leaveSession();
  });
  // JOIN SESSION ====> OV 객체 생성, 미디어 연결
  useEffect(() => {
    leaveSession();
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        // console.log("setOV");
        setOV(new OpenVidu());
      })
      .catch((e) => {
        alert("설정에서 카메라와 마이크를 허용해주세요.");
      });
  }, []);

  // SET SESSION ===> 세션 초기화 (OV 생성 후 실행)
  useEffect(() => {
    if (OV != null) {
      // ** enableProdMode() : Disable all logging except error level / Returns void
      OV.enableProdMode();
      // ** initSession() 세션 초기화 : Returns new session / Returns Session

      setSession(OV.initSession());
    }
  }, [OV]);

  // Subscriber 등록 / GET TOKEN (CREATE SESSION, CREATE TOKEN) ===> 세션 생성, 토큰 생성
  useEffect(() => {
    // console.log("useEffect session", session);
    if (session != null) {
      session.on("streamCreated", (event) => {
        //Stream Created
        const tempSubscribers = [..._subscribers];
        console.log(tempSubscribers);
        tempSubscribers.push(session.subscribe(event.stream, undefined));
        setSubscribers(tempSubscribers);
        _subscribers = tempSubscribers;
        console.log("Stream Created");
      });
      session.on("streamDestroyed", (event) => {
        //Stream Destroyed
        let tempSubscribers = [..._subscribers];
        // console.log(event.stream.streamManager);
        console.log(tempSubscribers);
        const index = tempSubscribers.indexOf(event.stream.streamManager, 0);
        console.log(index);
        if (index > -1) {
          tempSubscribers.splice(index, 1);
        }
        setSubscribers(tempSubscribers);
        _subscribers = tempSubscribers;
        console.log(tempSubscribers);
        console.log(_subscribers);
        console.warn("Stream Destroyed");
      });

      session.on("exception", (event) => {
        if (event.name === "ICE_CONNECTION_DISCONNECTED") {
          let stream = event.origin;
          console.warn("Stream " + stream.streamId + " disconnected!");
        }
        //exception
        // console.log("exception");
        console.log(event);
      });

      getToken();
      _sessionCreated = true;
    }
    return () => {
      if (_sessionCreated) {
        leaveSession();
      }
    };
  }, [session]);

  // GET TOKEN (CREATE SESSION, CREATE TOKEN)
  const getToken = () => {
    // console.log("getToken");
    dispatch(createSession(myProjectId)).then((res) => {
      dispatch(createViduToken(myProjectId));
    });
  };

  // TOKEN 이 있으면 SESSION CONNECT, Device 연결
  useEffect(() => {
    if (viduToken != null && session != null) {
      session
        .connect(viduToken, { clientData: nickname })
        .then(async () => {
          let devices = await OV.getDevices();
          let videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );

          setPublisher(
            OV.initPublisher(undefined, {
              audioSource: undefined, // The source of audio. If undefined default microphone
              videoSource: undefined, // The source of video. If undefined default webcam
              publishAudio: localUser.isAudioActive(), // Whether you want to start publishing with your audio unmuted or not
              publishVideo: localUser.isVideoActive(), // Whether you want to start publishing with your video enabled or not
              resolution: "640x480", // The resolution of your video
              frameRate: 30, // The frame rate of your video
              insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
              mirror: false, // Whether to mirror your local video or not
            })
          );
        })
        .catch((error) => {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        });
    }
  }, [viduToken]);

  // 세션 연결
  useEffect(() => {
    if (publisher != null) {
      session.publish(publisher);
      setMainCam(publisher);
    }
  }, [publisher]);

  localUser.setStreamManager(publisher);

  // 웹캠 상태 변경 (on & off)
  function camStatusChanged() {
    localUser.setVideoActive(!localUser.isVideoActive());
    localUser.getStreamManager().publishVideo(localUser.isVideoActive());
    setCam(localUser.isVideoActive());
    // console.log(localUser.isVideoActive());
  }
  // 마이크 상태 변경 (on & off)
  function micStatusChanged() {
    localUser.setAudioActive(!localUser.isAudioActive());
    localUser.getStreamManager().publishAudio(localUser.isAudioActive());
    setMic(localUser.isAudioActive());
  }

  // LEAVE SESSION
  const leaveSession = () => {
    console.log("leaveSession");
    if (session) {
      console.log("session disconnect", session);
      session.disconnect();
    }
    setOV(null);
    setSession(null);
    setSubscribers([]);
    setPublisher(null);
    localStorage.removeItem("viduToken");
  };

  return (
    <div className="video-container">
      {publisher != null ? (
        <div className="video">
          <Video streamManager={publisher} />
        </div>
      ) : null}
      <div className="video-btn-wrapper">
        <button
          onClick={() => {
            camStatusChanged();
          }}
        >
          <img src="/img/ic-cam.svg" alt="캠 버튼" />
        </button>
        <button
          onClick={() => {
            micStatusChanged();
          }}
        >
          <img src="/img/ic-mic.svg" alt="마이크 버튼" />
        </button>
      </div>
      {subscribers.map((sub, index) => {
        return (
          <div className="video" key={sub.stream.streamId}>
            <Video streamManager={sub} />
          </div>
        );
      })}
      {Array.from({ length: 3 - subscribers.length }, (item, i) => {
        return (
          <div className="video" key={i}>
            회의 참가자가 없습니다.
          </div>
        );
      })}
    </div>
  );
};
export default VideoChat;
