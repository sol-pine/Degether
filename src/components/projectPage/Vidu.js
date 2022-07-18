import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { OpenVidu } from "openvidu-browser";
import userModel from "openvidu-react/dist/models/user-model";
import { useDispatch, useSelector } from "react-redux";
import { createSession, createViduToken } from "../../redux/modules/ViduSlice";
import { useParams } from "react-router-dom";
import Video from "./Video";

function Vidu() {
  const dispatch = useDispatch();
  const viduToken = useSelector((state) => state.Vidu.viduToken);
  const { myprojectId } = useParams();
  const [sessionId, setSessionId] = useState(myprojectId);
  const [session, setSession] = useState(null);
  const [nickname, setNickname] = useState("nickname");
  const [OV, setOV] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [publisher, setPublisher] = useState(null);
  const [test, setTest] = useState(["test"]);
  const localUser = new userModel();
  let subscribers2 = [];
  // const OV = new OpenVidu();

  useEffect(() => {
    console.log("미디어 연결");
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        console.log(stream, "연결 완료");
        setOV(new OpenVidu());
      })
      .catch((e) => {
        alert("설정에서 카메라와 마이크를 허용해주세요.");
      });
  }, []);

  // JOIN SESSION
  const joinSession = () => {
    setOV(new OpenVidu());
  };

  useEffect(() => {
    console.log("useEffect OV", OV);
    if (OV != null) {
      console.log(OV);
      // ** enableProdMode() : Disable all logging except error level / Returns void
      OV.enableProdMode();
      // ** initSession() : Returns new session / Returns Session
      setSession(OV.initSession());
    }
  }, [OV]);
  useEffect(() => {
    console.log("useEffect session", session);

    if (session != null) {
      console.log(session);
      session.on("streamCreated", (event) => {
        //Stream Created
        const tempSubscribers = [...subscribers2];
        tempSubscribers.push(session.subscribe(event.stream, undefined));
        setSubscribers(tempSubscribers);
        subscribers2 = tempSubscribers;
        console.warn("Stream Created");
      });
      session.on("streamDestroyed", (event) => {
        //Stream Destroyed
        const index = subscribers.indexOf(event.stream.streamManager, 0);
        let tempSubscribers = [...subscribers];
        if (index > -1) {
          tempSubscribers.splice(index, 1);
        }
        setSubscribers(tempSubscribers);
        console.log("Stream Destroyed");
      });

      session.on("exception", (event) => {
        //exception
        console.log("exception");
        console.log(event);
      });

      getToken();
    }
  }, [session]);
  // GET TOKEN (CREATE SESSION, CREATE TOKEN)
  const getToken = () => {
    dispatch(createSession(myprojectId));
    dispatch(createViduToken(myprojectId));
  };

  useEffect(() => {
    console.log("useEffect token", viduToken);
    if (viduToken != null && session != null) {
      console.log("connect");
      session
        .connect(viduToken, { clientData: nickname })
        .then(async () => {
          var devices = await OV.getDevices();
          var videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );

          setPublisher(
            OV.initPublisher(undefined, {
              audioSource: undefined, // The source of audio. If undefined default microphone
              videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
              publishAudio: false, // Whether you want to start publishing with your audio unmuted or not
              publishVideo: true, // Whether you want to start publishing with your video enabled or not
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
    }
  }, [publisher]);

  localUser.setStreamManager(publisher);
  //웹캠 상태 변경 (on&off)
  function camStatusChanged() {
    localUser.setVideoActive(!localUser.isVideoActive());
    localUser.getStreamManager().publishVideo(localUser.isVideoActive());
  }

  // LEAVE SESSION
  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }
    setOV(null);
    setSession(null);
    setSubscribers([]);
    setPublisher(null);
    // setViduToken(null);
  };

  return (
    <div>
      <Container>
        <Title>화상 회의</Title>
        <button
          onClick={() => {
            leaveSession();
          }}
        >
          나가기
        </button>
        <button
          onClick={() => {
            joinSession();
          }}
        >
          입장하기
        </button>
        <ViduBox>
          <SubVidu>
            <button>
              <svg
                width="40"
                height="20"
                viewBox="0 0 40 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 20L20 0L40 20H0Z" fill="black" />
              </svg>
            </button>
            <section>
              <div className="memberWrap">
                {subscribers.map((sub, i) => (
                  <div className="member" key={i}>
                    <Video streamManager={sub} />
                  </div>
                ))}
              </div>
              <div className="memberWrap">
                <div className="member"></div>
                <div className="member"></div>
                <div className="member"></div>
                <div className="member"></div>
              </div>
            </section>
            <button>
              <svg
                width="40"
                height="20"
                viewBox="0 0 40 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M40 0L20 20L1.74846e-06 -3.49691e-06L40 0Z"
                  fill="black"
                />
              </svg>
            </button>
          </SubVidu>
          <MainVidu>
            {publisher != null ? <Video streamManager={publisher} /> : null}
            <div>
              <button>
                <img src="/img/share.png" alt="screenshare"></img>
              </button>
              <button>
                {" "}
                <img
                  src="/img/mic.svg"
                  alt="mic control
              "
                ></img>
              </button>
              <button
                onClick={() => {
                  camStatusChanged();
                }}
              >
                <img src="/img/cam.svg" alt="cam control"></img>
              </button>
            </div>
          </MainVidu>
        </ViduBox>
      </Container>
    </div>
  );
}

export default Vidu;
const Container = styled.div`
  width: 1224px;
  height: 1080px;
`;
const Title = styled.div`
  width: 1082px;
  height: 70px;
  background: #efefef;
  border-radius: 10px;
  margin: 256px 71px 20px 71px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 22px;
  color: #000;
`;
const ViduBox = styled.div`
  width: 1074px;
  height: 664px;
  display: flex;
  margin: 0 auto;
`;
const SubVidu = styled.div`
  width: 288px;
  height: 664px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  section {
    width: 288px;
    height: 592px;
    margin: 16px 28px 16px 0;
    display: flex;
    justify-content: space-between;
  }
  button {
    width: 288px;
    height: 20px;
    background: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    cursor: pointer;
  }
  .memberWrap {
    width: 136px;
    height: 592px;
  }
  .member {
    width: 136px;
    height: 136px;
    background: #efefef;
    border-radius: 10px;
    margin-bottom: 16px;
  }
  video {
    width: 136px;
    height: 136px;
    border-radius: 10px;
    margin-bottom: 16px;
  }
`;
const MainVidu = styled.div`
  width: 758px;
  height: 663px;
  margin-left: 28px;
  border: 1px solid #d6e5d0;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  video {
    width: 700px;
    height: 600px;
    background: #09120e;
    border-radius: 10px;
  }
  div {
    height: 55px;
    bottom: 19px;
    left: 20px;
    display: flex;
    position: absolute;
    left: 49px;
    bottom: 49px;
  }
  button {
    width: 55px;
    height: 55px;
    border-radius: 55px;
    background: #efefef;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
    margin-right: 17px;
  }
  img {
    width: 30.77px;
    height: 30.96px;
  }
`;
const Monitor = styled.svg`
  width: 24px;
  height: 32px;
`;
