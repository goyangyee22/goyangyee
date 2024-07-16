function getTimes() {
  // UTC 표준 시간과 현재 로컬 시간의 차이를 밀리초 단위로 저장합니다.
  const offset = new Date().getTimezoneOffset()*60000;
  const today = new Date(Date.now()-offset);
  const isoString = today.toISOString(); //2024-07-15T16:15:24.654z
  const hourMinutes = isoString.split("T")[1].split(":");
  return hourMinutes[0] + hourMinutes[1];
}

export { getTimes };
