import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { SERVER_URL } from "../shared/api";
import axios from "axios";
import LeftInfoBar from "../components/common/LeftInfoBar";
import NoteDetail from "../components/project_page/NoteDetail";
import { Header } from "../components/header/Header";
import UserSidebar from "../components/side/project/UserSidebar";

function MeetingNote() {
  const { myProjectId } = useParams();
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState();

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/api/meetingNotes/` + myProjectId, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        setNotes(res.data.result);
      })
      .catch((e) => console.log(e.message));
  }, []);

  function noteDetail(note) {
    console.log(note);
    setNote(note);
  }
  return (
    <div>
      <Header />
      <Container>
        <LeftInfoBar />
        <NoteList>
          <NoteListNav>회의록</NoteListNav>

          {notes.map((note, idx) => {
            return (
              <div
                className="noteList"
                onClick={() => noteDetail(note)}
                key={idx}
              >
                {note.title}
              </div>
            );
          })}
        </NoteList>
        <NoteDetailContainer>
          <NoteDetail note={note} />
          {/* {note != null ? <NoteDetail note ={note} /> : null} */}
        </NoteDetailContainer>
        <UserSidebar />
      </Container>
    </div>
  );
}
export default MeetingNote;
const Container = styled.div`
  width: 1888px;
  margin: 0 auto;
  display: flex;
`;
const NoteList = styled.div`
  width: 150px;
  height: 580px;
  background: #d6e5d0;
  display: flex;
  justify-content: center;
`;
const NoteListNav = styled.div`
  margin-top: 200px;
  width: 212px;
  height: 42px;
  font-weight: 400;
  font-size: 22px;
  color: #2f4a3b;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const NoteDetailContainer = styled.div`
  margin-top: 182px;
  width: 1012px;
  height: 1012px;
`;
