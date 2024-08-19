import axios from "axios";
import {
  parseFirestoreFields,
  toFirestoreFields,
} from "./utils/firebaseTranslate";

const API_KEY = "AIzaSyBP0BMK34Pmmdwt6Lp_hYIvea2rMCiC5O0";
const AUTH_TOKEN =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ0MjY5YTE3MzBlNTA3MTllNmIxNjA2ZTQyYzNhYjMyYjEyODA0NDkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2hvcC1hcHAtMzBiZGEiLCJhdWQiOiJzaG9wLWFwcC0zMGJkYSIsImF1dGhfdGltZSI6MTcyMzc5NjY0MiwidXNlcl9pZCI6IjZYeHJmNEFncmplNEVSdFozdWhQdW43Z3g1TzIiLCJzdWIiOiI2WHhyZjRBZ3JqZTRFUnRaM3VoUHVuN2d4NU8yIiwiaWF0IjoxNzIzNzk2NjQyLCJleHAiOjE3MjM4MDAyNDIsImVtYWlsIjoidGVzdHVzZXIxQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0dXNlcjFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.QOEdEbe0dZR4m2uqk4DOh1l9sAZBjzxDbDOEF29QzURInLNefyAtAGFn5D98NTnxQ7I7uo2ISoFF_j0N1wfHddOgKL--GwDtPdu-zVrkiV3tUp7Kers6d-_qvkpN4cXsqHixpU3HYzNlBTNJYK4rV_uTk-BcgfaDbHuO_iaEL36wfDUNF9DOEJcEhVEgEBWd5NKk0sPxeNyD2hyc4PsNef2laBk76H4FVsI6Uf1Q0AzdPKIa1Wl6UTSVPYzrt94NLysZavNPIWfU641sD7lq4G-e5iJ_pC3UskSp4e3xGyi67O7rn2OSYTs42K8GxvhSeUVoXh-Zbqy-xK12kvkFQA";

const BASE_URL =
  "https://firestore.googleapis.com/v1/projects/shop-app-30bda/databases/(default)/documents";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

function getResultData(response) {
  if (response.data.length > 0) {
    const result = response.data.map((data) => {
      return {
        ...parseFirestoreFields(data.document.fields),
        docId: data.document.name.split("/").pop(),
      };
    });
    return result;
  } else {
    return {
      ...parseFirestoreFields(response.data.fields),
      docId: response.data.name.split("/").pop(),
    };
  }
}

export async function getDatasRest(collectionName, queryOptions) {
  const { conditions } = queryOptions;
  const [condition] = conditions;
  const { field, operator, value } = condition;
  try {
    const response = await api.post(":runQuery", {
      structuredQuery: {
        from: [{ collectionId: collectionName }],
        where: {
          fieldFilter: {
            field: { fieldPath: field },
            op: operator,
            value: { stringValue: value },
          },
        },
      },
    });
    // console.log(getResultData(response));
    return getResultData(response);
  } catch (error) {
    console.error("데이터 가져오기 오류: ", error);
  }
}

export async function getDataRest(url) {
  // /products/productId
  const response = await api.get(url);
  return getResultData(response);
}

export async function addDatasRest(url, addObj) {
  try {
    await api.patch(url, { fields: toFirestoreFields(addObj) });
    return true;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteDatasRest(url) {
  try {
    await api.delete(url);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function deleteDatasRestBatch(url, dataArr) {
  try {
    for (const item of dataArr) {
      const response = await api.delete(`${url}${item.id}`);
    }
    // const requests = dataArr.map((item) => {
    //   return {
    //     delete: `projects/shop-app-c8539/databases/(default)/documents/${url}/${item.id}`,
    //   };
    // });
    // console.log(requests);

    // const response = await api.post(
    //   ":batchWrite",
    //   { writes: requests },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${AUTH_TOKEN}`,
    //     },
    //   }
    // );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
