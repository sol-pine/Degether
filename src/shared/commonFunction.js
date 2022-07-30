export function handleError(error) {
  // 로그인이 필요합니다.
  if (error.response.status === 410) {
    alert("로그인이 필요합니다.");
    localStorage.removeItem("token");
    window.location.replace("/");
  }
  // 최대 업로드 사이즈를 초과했습니다.
  if (error.response.status === 411) {
    alert("업로드 가능한 용량을 초과했습니다.");
  }
  // 존재하지 않는 프로젝트입니다.
  if (error.response.status === 412) {
    alert("존재하지 않는 프로젝트입니다.");
    window.location.replace("/");
  }
  // 존재하지 않는 댓글입니다.
  if (error.response.status === 413) {
    alert("존재하지 않는 댓글입니다.");
  }
  // 존재하지 않는 유저입니다.
  if (error.response.status === 414) {
    alert("유저 정보가 없습니다.");
  }
  // 권한이 없습니다.
  if (error.response.status === 415) {
    alert("권한이 없습니다.");
    window.location.replace("/");
  }
  // 이미 지원한 프로젝트입니다.
  if (error.response.status === 416) {
    alert("이미 지원한 프로젝트입니다.");
  }
  // 해당 유저는 지원한 상태가 아닙니다.
  if (error.response.status === 417) {
    alert("지원하지 않은 프로젝트입니다.");
  }
  // 이미 가입된 유저입니다.
  if (error.response.status === 418) {
    alert("이미 가입된 유저입니다.");
  }
  // 유효하지 않은 토큰입니다.
  if (error.response.status === 419) {
    alert("로그인이 필요합니다.");
    localStorage.removeItem("token");
    window.location.replace("/");
  }
  // 유효기간이 만료된 토큰입니다.
  if (error.response.status === 420) {
    alert("로그인이 필요합니다.");
    localStorage.removeItem("token");
    window.location.replace("/");
  }
  // 기존 서명을 확인할 수 없습니다.
  if (error.response.status === 421) {
    alert("로그인이 필요합니다.");
    localStorage.removeItem("token");
    window.location.replace("/");
  }
  // 지원하지 않는 토큰입니다.
  if (error.response.status === 422) {
    alert("로그인이 필요합니다.");
    localStorage.removeItem("token");
    window.location.replace("/");
  }
  // 토큰형식이 맞지 않습니다.
  if (error.response.status === 423) {
    alert("로그인이 필요합니다.");
    localStorage.removeItem("token");
    window.location.replace("/");
  }
  // 탈퇴한 회원입니다.
  if (error.response.status === 424) {
    alert("탈퇴한 회원입니다.");
    localStorage.removeItem("token");
    window.location.replace("/");
  }
  // 네이버 오류입니다.
  if (error.response.status === 425) {
    alert("네이버 오류입니다.");
    localStorage.removeItem("token");
    window.location.replace("/");
  }
  // 프로젝트 생성, 수정 오류 안내
  if (error.response.status === 450) {
    alert(error.response.data);
  }
}
