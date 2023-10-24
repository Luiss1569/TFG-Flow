import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7071/",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer " +
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg4MDkyOGRkLWE3N2EtNDExYi1hN2M0LWYyMzk1MTU0YzdhZSIsIm5hbWUiOiJSYWZhZWwgRnJpbmhhbmkiLCJtYXRyaWN1bGF0aW9uIjoiIiwiZW1haWwiOiJmcmluaGFuaUB1bmlmZWkuZWR1LmJyIiwiY3BmIjoiMTIzMTIzMTIzMTEiLCJyb2xlIjoidGVhY2hlciIsImlhdCI6MTY5ODAxNDY2OSwiZXhwIjoxNjk4MTAxMDY5fQ.0JO6G874x5sHXxnKMU6TD9uosqhkDccnBgepgoQ_9uE",
  },
});

export default api;
