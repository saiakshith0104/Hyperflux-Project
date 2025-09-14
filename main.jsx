import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import "./styles/app.css";
import axios from "axios";

const updateEndTime = (response) => {
  if (!response || !response.config || !response.config.customData) {
    return response;
  }
  response.customData = response.customData || {};
  response.customData.time =
    new Date().getTime() - response.config.customData.startTime;
  return response;
};

axios.interceptors.request.use((request) => {
  request.customData = request.customData || {};
  request.customData.startTime = new Date().getTime();
  return request;
});

axios.interceptors.response.use(updateEndTime, (e) => {
  return Promise.reject(updateEndTime(e.response));
});

axios.interceptors.response.use(updateEndTime, (e) => {
  if (e.response) {
    return Promise.reject(updateEndTime(e.response));
  }
  return Promise.reject(e); 
});


ReactDOM.createRoot(document.getElementById("_root_")).render(<App />);