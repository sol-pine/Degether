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
  // const OV = new OpenVidu();

  useEffect(() => {
    joinSession();
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
        let tempSubscribers = [...subscribers];
        tempSubscribers.push(session.subscribe(event.stream, undefined));
        setSubscribers(tempSubscribers);
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

  function btnTest() {
    console.log("testOV", OV);
    console.log("session", session);
    console.log("token", viduToken);
  }

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
                <img src="img/share.png" />
              </button>
              <button>
                <svg
                  width="24"
                  height="32"
                  viewBox="0 0 24 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.2565 19.9008C14.9927 19.9008 17.1851 17.6786 17.1851 14.9257L17.2015 4.97556C17.2015 2.22269 14.9927 0.000488281 12.2565 0.000488281C9.52022 0.000488281 7.31142 2.22269 7.31142 4.97556V14.9257C7.31142 17.6786 9.52022 19.9008 12.2565 19.9008ZM20.9927 14.9257C20.9927 19.9008 16.8059 23.3833 12.2565 23.3833C7.70703 23.3833 3.52022 19.9008 3.52022 14.9257H0.718018C0.718018 20.5807 5.20153 25.2573 10.6081 26.0699V31.5093H13.9048V26.0699C19.3114 25.2738 23.7949 20.5973 23.7949 14.9257H20.9927Z"
                    fill="black"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  camStatusChanged();
                }}
              >
                <svg
                  width="24"
                  height="17"
                  viewBox="0 0 24 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.9744 6.16327V1.56824C17.9744 0.846161 17.3974 0.255371 16.6923 0.255371H1.30769C0.602558 0.255371 0.0256348 0.846161 0.0256348 1.56824V14.6969C0.0256348 15.419 0.602558 16.0098 1.30769 16.0098H16.6923C17.3974 16.0098 17.9744 15.419 17.9744 14.6969V10.1019L23.1026 15.3533V0.911804L17.9744 6.16327Z"
                    fill="black"
                  />
                </svg>
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
