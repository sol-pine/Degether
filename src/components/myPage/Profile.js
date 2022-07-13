import React from "react";
import styled from "styled-components";

function Profile() {
  return (
    <div>
      <ProfileContainer>
        <p>공개 프로필 수정</p>
        <ProfileBoxWrap>
          <LeftBox></LeftBox>
          <RightBox>
            <section>
              <div className="nick">
                <p>닉네임</p>
                <input type="text" value="HOUSE" />
              </div>
              <div className="phone">
                <p>연락처</p>
                <input type="text" value="010-0000-0000" />
              </div>
              <div className="email">
                <p>E-MAIL 주소</p>
                <input type="text" value="TRUECAT1989@NAVER.COM" />
              </div>
            </section>
            <section>
              <div className="role">
                <p>업무파트</p>
                <select>
                  <option>선택</option>
                  <option value="모바일 앱">모바일 앱</option>
                  <option value="웹 프로그램">웹 프로그램</option>
                  <option value="게임">게임</option>
                  <option value="메타버스">메타버스</option>
                  <option value="블록체인">블록체인</option>
                  <option value="임베디드">임베디드</option>
                  <option value="데이터베이스">데이터베이스</option>
                </select>
              </div>
            </section>
            <section>
              <p>업무 가능 영역</p>
              <div></div>
            </section>
          </RightBox>
        </ProfileBoxWrap>
      </ProfileContainer>
    </div>
  );
}
export default Profile;

const ProfileContainer = styled.div`
  width: 1371px;
  height: 836px;
  background: blue;
  margin-top: 213px;
  margin-left: 32px;
  font-weight: 700;
  font-size: 22px;
  color: #000;
`;
const ProfileBoxWrap = styled.div`
  width: 1371px;
  height: 788px;
  margin-top: 16px;
  background: #ffffff;
  border: 1px solid #efefef;
  border-radius: 10px;
  display: flex;
`;
const LeftBox = styled.div`
  width: 687px;
  height: 788px;
  background: #ffffff;
  border: 1px solid #efefef;
  border-radius: 10px;
`;
const RightBox = styled.div`
  width: 606px;
  height: 726px;
  color: #09120e;
  margin-top: 16px;
  margin-left: 16px;
  section {
    display: flex;
  }
  p {
    font-weight: 700;
    font-size: 12px;
  }
  .nick {
    width: 150px;
    height: 63px;
  }
  .phone {
    width: 150px;
    height: 63px;
    margin-left: 8px;
  }
  .email {
    width: 290px;
    height: 63px;
    margin-left: 8px;
  }
  input {
    border: 1px solid #efefef;
    border-radius: 10px;
    font-weight: 400;
    font-size: 12px;
    padding: 12px 0px 12px 12px;
    margin-top: 5px;
  }
`;
