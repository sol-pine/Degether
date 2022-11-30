import React, { useEffect, useState } from "react";

const Video = (manager) => {
  const [streamManager, setStreamManager] = useState(manager);
  let videoRef = React.createRef();

  useEffect(() => {
    setStreamManager(streamManager.addVideoElement(videoRef.current));
  }, []);

  return <video autoPlay={true} ref={videoRef}></video>;
};
export default Video;
