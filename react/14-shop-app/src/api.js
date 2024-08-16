import axios from "axios";

const api = axios.create({
  baseURL:
    "https://firestore.googleapis.com/v1/projects/shop-app-30bda/databases/(default)/documents",
});
