import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { OpenVidu } from "openvidu-browser";
import userModel from "openvidu-react/dist/models/user-model";
import { useDispatch, useSelector } from "react-redux";
import { createViduToken } from "../../redux/modules/ViduSlice";

function Vidu() {
  const dispatch = useDispatch();
  const [session, setSession] = useState(false);
  const [mySessionId, setMySessionId] = useState("200");
  const [myUserName, setMyUserName] = useState("hey");
  const [subscribers, setSubscribers] = useState([]);
  const localUser = new userModel();
  const OV = new OpenVidu();
  console.log(OV);
  console.log(localUser);
  console.log(OV.publishers);

  useEffect(() => {
    dispatch(createViduToken());
  }, []);

  const viduToken = useSelector((state) => state.Vidu.viduToken);
  console.log(viduToken);

  //채팅방 입장
  //채팅
  //채팅방 종료
  //마이크 ON
  //마이크 OFF
  //화면공유 ON
  //화면공유 OFF

  //채팅 시작
  //   function joinSession(event) {
  //     if (mySessionId && myUserName) {
  //         getToken();
  //       setToken(token);
  //       setSession(true);
  //         event.preventDefault();
  //     }
  //   }

  //웹캠 연결
  useEffect(() => {
    connectWebCam();
    // joinSession();
  }, []);
  let devices;
  async function connectWebCam() {
    devices = await OV.getDevices();
  }
  const publisher = OV.initPublisher(undefined, {
    audioSource: undefined,
    videoSource: undefined,
    publishAudio: localUser.isVideoActive(),
    publishVideo: localUser.isVideoActive(),
    resolution: "640x480",
    frameRate: 30,
    insertMode: "APPEND",
  });

  //     if (this.state.session.capabilities.publish) {
  //         publisher.on('accessAllowed' , () => {
  //             this.state.session.publish(publisher).then(() => {
  //                 this.updateSubscribers();
  //                 this.localUserAccessAllowed = true;
  //                 if (this.props.joinSession) {
  //                     this.props.joinSession();
  //                 }
  //             });
  //         });

  //     }
  localUser.setStreamManager(publisher);
  //웹캠 상태 변경 (on&off)
  function camStatusChanged() {
    localUser.setVideoActive(!localUser.isVideoActive());
    localUser.getStreamManager().publishVideo(localUser.isVideoActive());
  }

  //   camStatusChanged() {
  //     localUser.setVideoActive(!localUser.isVideoActive());
  //     localUser.getStreamManager().publishVideo(localUser.isVideoActive());
  //     this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
  //     this.setState({ localUser: localUser });
  // }

  return (
    <div>
      <Container>
        <Title>화상 회의</Title>
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
                <div className="member"></div>
                <div className="member"></div>
                <div className="member"></div>
                <div className="member"></div>
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
            <video autoPlay muted></video>
            <div>
              <button>
                <img src="img/share.svg" />
              </button>
              <button>
                <img src="img/mic.svg" />
              </button>
              <button>
                <img
                  src="img/cam.svg"
                  onClick={() => {
                    camStatusChanged();
                  }}
                />
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
`;
