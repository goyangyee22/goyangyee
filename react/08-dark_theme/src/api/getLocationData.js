import { getXmlToJson } from "../utils/getXmlToJson";

const SERVICE_KEY =
  "165j91%2FmwF81d0tdcA9hsEmHGRjkVzrVSYYimtawGbX%2B6TVJDvP8sA2ZFI2GDOWDdNcwA6KMk0jafKzsWWkYtQ%3D%3D";

function getFormattedDate() {
  const today = new Date();
  const isoString = today.toISOString(); // 2024-07-15T15:05:35.575Z
  // T를 기준으로 2024-07-15까지 가져오고 -를 기준으로 20240715를 반환합니다.
  const formattedDate = isoString.split("T")[0].split("-").join("");
  console.log(formattedDate);
  return formattedDate;
}

async function getSunsetRiseData() {
  var xhr = new XMLHttpRequest();
  var url =
    "http://apis.data.go.kr/B090041/openapi/service/RiseSetInfoService/getAreaRiseSetInfo"; /*URL*/
  var queryParams =
    "?" + encodeURIComponent("serviceKey") + "=" + SERVICE_KEY; /*Service Key*/
  queryParams +=
    "&" +
    encodeURIComponent("locdate") +
    "=" +
    encodeURIComponent(getFormattedDate()); /**/
  queryParams +=
    "&" +
    encodeURIComponent("location") +
    "=" +
    encodeURIComponent("대전"); /**/
  const result = await fetch(url + queryParams);
  const textResult = await result.text();
  const xmlString = new DOMParser().parseFromString(textResult, "text/xml");
  const jsonResult = getXmlToJson(xmlString);
  return jsonResult.response.body.items.item;
}

export { getSunsetRiseData };
