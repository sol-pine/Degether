import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { SERVER_URL, token } from "../../shared/api";
import axios, { Axios } from "axios";
const NoteDetail = (props) => {
  const [note, setNote] = useState();
  const [utterances, setUtterances] = useState([]);
  const audioPlayer = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [seekValue, setSeekValue] = useState(0);
  const [utterance, setUtterance] = useState();

  useEffect(() => {
    console.log("noteDetail Render", props);
    setNote(props.note);
  }, [props]);
  useEffect(() => {
    console.log("noteDetail Render", note);

    if (note != null) {
      axios
        .get(`${SERVER_URL}/api/meetingNote/` + note.id, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
          setUtterances(res.data.result);
        })
        .catch((e) => console.log(e.message));
    }
  }, [note]);
  const onPlaying = () => {
    // setCurrentTime(audioPlayer.current.currentTime);
    setSeekValue(
      ((audioPlayer.current.currentTime - utterance.start_at / 1000 + 0.5) /
        (utterance.duration / 1000 + 0.5)) *
        100
    );
    console.log(seekValue);
    console.log(audioPlayer.current.currentTime);
    if (
      audioPlayer.current.currentTime >
      (utterance.start_at + utterance.duration) / 1000
    ) {
      audioPlayer.current.pause();
    }
  };

  function playAudio(utterance) {
    // console.log(audio);
    console.log(audioPlayer);
    console.log(utterance.start_at / 1000 - 0.5);
    audioPlayer.current.currentTime = utterance.start_at / 1000 - 0.5;
    audioPlayer.current.play();
    setUtterance(utterance);
  }
  return (
    <div>
      <Container>
        {note != undefined ? (
          <div>
            <audio
              src={note.url}
              ref={audioPlayer}
              onTimeUpdate={onPlaying}
            ></audio>
            {props.note.title}
          </div>
        ) : (
          <div>대기중</div>
        )}
        {utterances.map((item, idx) => {
          return (
            <div key={idx}>
              <div onClick={() => playAudio(item)}>{item.msg}</div>

              {item == utterance ? (
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={seekValue}
                  onChange={(e) => {
                    console.log(e);
                    const seekto =
                      item.start_at / 1000 +
                      (item.duration / 1000) * (+e.target.value / 100);
                    audioPlayer.current.currentTime = seekto;
                    setSeekValue(e.target.value);
                    audioPlayer.current.play();
                  }}
                />
              ) : null}
            </div>
          );
        })}
      </Container>
    </div>
  );
};
export default NoteDetail;
const Container = styled.div`
  font-weight: 400;
  font-size: 18px;
  padding: 30px;
`;
