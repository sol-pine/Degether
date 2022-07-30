import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { OpenVidu } from "openvidu-browser";
import userModel from "openvidu-react/dist/models/user-model";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Video from "./Video";
import { createSession, createViduToken } from "../../redux/ViduSlice";
import axios from "axios";
import { SERVER_URL } from "../../shared/api";
import { handleError } from "../../shared/commonFunction";
import { useBeforeunload } from "react-beforeunload";
function Vidu() {
  const dispatch = useDispatch();
  const viduToken = useSelector((state) => state.Vidu.viduToken);
  const { myProjectId } = useParams();
  const [sessionId, setSessionId] = useState(myProjectId);
  const [session, setSession] = useState(null);
  const [nickname, setNickname] = useState("");
  const [OV, setOV] = useState(null);
  const [cam, setCam] = useState(true);
  const [mic, setMic] = useState(false);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [mainCam, setMainCam] = useState(null);
  let _subscribers = [];
  let _sessionCreated = false;
  const localUser = new userModel();
  localUser.setVideoActive(true);
  localUser.setAudioActive(false);
  const userInfo = useSelector((state) => state.User.userInfo);

  useBeforeunload((event) => {
    leaveSession();
  });

  // 1 joinSession => openvidu 객체 생성
  // 2 setSession(OV.initSession())
  // 3 session listener 등록, getToken
  // 4 getDevice , setPublisher(),
  // 5 session.publish(publisher)

  useEffect(() => {
    setNickname(userInfo.nickname);
  }, [userInfo]);

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
      // console.log("SET SESSION");
      console.log(session);
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
        // console.log(session);
        leaveSession();
        // console.log("destroy");
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
    // console.log("useEffect token", viduToken);
    if (viduToken != null && session != null) {
      // console.log("CONNECT!");
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
      // console.log("session publish");
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
    console.log(localUser.isAudioActive());
    localUser.setAudioActive(!localUser.isAudioActive());
    console.log(localUser.isAudioActive());
    localUser.getStreamManager().publishAudio(localUser.isAudioActive());
    setMic(localUser.isAudioActive());
    console.log(localUser.isAudioActive());
  }

  // 화면 공유
  function screenShare() {
    const videoSource =
      // 브라우저에 따라 videoSource 설정
      navigator.userAgent.indexOf("Firefox") !== -1 ? "window" : "screen";
    console.log(navigator.userAgent);
    const publisher = OV.initPublisher(
      undefined,
      {
        videoSource: videoSource,
        publishAudio: false,
        publishVideo: localUser.isVideoActive(),
        mirror: false,
      },
      (error) => {
        if (error && error.name === "SCREEN_EXTENSION_NOT_INSTALLED") {
          this.setState({ showExtensionDialog: true });
        } else if (error && error.name === "SCREEN_SHARING_NOT_SUPPORTED") {
          alert("화면 공유를 지원하지 않는 브라우저입니다.");
        } else if (error && error.name === "SCREEN_EXTENSION_DISABLED") {
          alert("화면 공유 확장 프로그램을 사용해야 합니다.");
        } else if (error && error.name === "SCREEN_CAPTURE_DENIED") {
          alert("공유할 화면을 선택해주세요.");
        }
      }
    );
    publisher.once("accessAllowed", () => {
      session.unpublish(localUser.getStreamManager());
      localUser.setStreamManager(publisher);
      session.publish(localUser.getStreamManager()).then(() => {
        localUser.setScreenShareActive(true);
        this.setState({ localUser: localUser }, () => {
          this.sendSignalUserChanged({
            isScreenShareActive: localUser.isScreenShareActive(),
          });
          console.log(localUser.isScreenShareActive());
        });
      });
      publisher.on("streamPlaying");
    });
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

  //녹음 시작, 중지 함수
  const startRecording = () => {
    console.log(session.sessionId);
    axios
      .get(`${SERVER_URL}/openvidu/api/recordings/start/` + session.sessionId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
          // "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => handleError(error));
  };
  const stopRecording = () => {
    axios
      .get(
        `${SERVER_URL}/openvidu/api/recordings/stop/` + session.sessionId,
        // {
        // },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
            // "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => handleError(error));
  };
  // const switchCamera = (sub) => {
  //   console.log(mainCam);
  //   // console.log(index);
  //   const tempSubscribers = [..._subscribers];
  //   console.log(tempSubscribers);
  //   // console.log(tempSubscribers);
  //   // const tempMainCam = mainCam;
  //   // setMainCam(sub);
  //   // const index = _subscribers.indexOf(sub, 0);
  //   // let tempSubscribers = [..._subscribers];
  //   // if (index > -1) {
  //   //   tempSubscribers.splice(index, 1,tempMainCam );
  //   // }
  //   // setSubscribers(tempSubscribers);
  //   // _subscribers = tempSubscribers;
  //   // console.log(index);
  //   // console.log(_subscribers);
  //   // console.log(tempSubscribers);
  //   // console.log("Switch Camera");
  // }

  console.log("Subscribers", subscribers);
  console.log("Pub", publisher);
  return (
    <>
      <Container>
        <ViduBox>
          <SubVidu>
            <section>
              <MemberGrid>
                {subscribers.map((sub, idx) => {
                  return (
                    <div className="member" key={sub.stream.streamId}>
                      <Video streamManager={sub} />
                    </div>
                  );
                })}
                {Array.from({ length: 8 - subscribers.length }, (item, i) => {
                  return <div className="member" key={i}></div>;
                })}
              </MemberGrid>
            </section>
          </SubVidu>
          <MainVidu>
            {publisher != null ? <Video streamManager={publisher} /> : null}
            <div>
              <OnBtn
                onClick={() => {
                  screenShare();
                }}
              >
                <img src="/img/share.png" alt="screen share" />
              </OnBtn>
              {mic ? (
                <OnBtn
                  onClick={() => {
                    micStatusChanged();
                  }}
                >
                  <img src="/img/mic.svg" alt="mic control" />
                </OnBtn>
              ) : (
                <OffBtn
                  onClick={() => {
                    micStatusChanged();
                  }}
                >
                  <img src="/img/mic.svg" alt="mic control" />
                </OffBtn>
              )}

              {cam ? (
                <OnBtn
                  onClick={() => {
                    camStatusChanged();
                  }}
                >
                  <img src="/img/cam.svg" alt="cam control" />
                </OnBtn>
              ) : (
                <OffBtn
                  onClick={() => {
                    camStatusChanged();
                  }}
                >
                  <img src="/img/cam.svg" alt="cam control" />
                </OffBtn>
              )}
              <OnBtn
                onClick={() => {
                  startRecording();
                  alert("녹음이 시작되었습니다.");
                }}
              >
                RECORD <br />
                ON
              </OnBtn>
              <OnBtn
                onClick={() => {
                  stopRecording();
                  alert("녹음이 종료되었습니다.");
                }}
              >
                RECORD <br />
                OFF
              </OnBtn>
            </div>
          </MainVidu>
        </ViduBox>
      </Container>
    </>
  );
}

export default Vidu;
const Container = styled.div`
  width: 1225px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 250px;
`;

const ViduBox = styled.div`
  width: 1082px;
  height: 664px;
  border-radius: 10px;
  display: flex;
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
  .memberWrap {
    width: 136px;
    height: 592px;
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
  .member {
    width: 136px;
    height: 136px;
    background: #ddd;
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
  background: #ddd;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  video {
    width: 700px;
    height: 600px;
    background: #ddd;
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
  img {
    width: 30.77px;
    height: 30.96px;
  }
`;
const MemberGrid = styled.div`
  min-width: 288px;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(2, 136px);
  grid-column-gap: 12px;
  grid-row-gap: 12px;
`;
const OnBtn = styled.button`
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
  font-size: 12px;
  line-height: 12px;
`;
const OffBtn = styled.button`
  width: 55px;
  height: 55px;
  border-radius: 55px;
  background: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  margin-right: 17px;
`;
