import React, { useEffect, useState } from "react";
function Video(props) {
  const [streamManager, setStreamManager] = useState(props.streamManager);
  const [videoRef, setVideoRef] = useState(React.createRef());

  useEffect(() => {
    console.log(streamManager);
    setStreamManager(streamManager.addVideoElement(videoRef.current));
  }, []);
  useEffect(() => {}, [streamManager]);

  return <video autoPlay={true} ref={videoRef}></video>;
}
export default Video;
