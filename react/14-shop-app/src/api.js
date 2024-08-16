import axios from "axios";
import {
  parseFirestoreFields,
  toFirestoreFields,
} from "./utils/firebaseTranslate";

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
  await api.patch(url, { fields: toFirestoreFields(addObj) });
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
