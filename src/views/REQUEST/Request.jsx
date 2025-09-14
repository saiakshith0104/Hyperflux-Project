import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import RequestTabs from "../components/RequestTabs";
import toObject, { reverseToKeyValue } from "../../utils/toObject";
import UrlInput from "../components/UrlInput";
import axios from "axios";
import { saveToHistory } from "../../utils/localStorage";
import toast from "react-hot-toast";

const initialKeyValueState = () => [
  {
    id: uuidv4(),
    key: "",
    value: "",
  },
];

const initialURLState = "https://jsonplaceholder.typicode.com/posts/1"

const detectType = (data) => {
  if (typeof data == "object") {
    return JSON.stringify(data, null, 2)
  }
  return data
}

const validBody = (data) => {
  const DataLen = Object.entries(data).length > 0;
  
  if (DataLen) return JSON.stringify(data, null, 2)
  return "{\n\t\n}"
}

export default function Request({ setResponse, sendingState, setHistory, initialRequest }) {
  const [sending, setSending] = sendingState;
  const [URL, setURL] = useState(initialURLState);
  const [method, setMethod] = useState("GET");
  const [queryParams, setQueryParams] = useState(initialKeyValueState);
  const [headers, setHeaders] = useState(initialKeyValueState);

  const [initialBody, setInitialBody] = useState("{\n\t\n}");
  const [body, setBody] = useState(initialBody);
 
  const logRequest = (method, url, requestData, responseData, status) => {
    const logEntry = {
        timestamp: new Date().toISOString(),
        method,
        url,
        requestData: requestData || "No request data",
        responseData: responseData || "No response data",
        status,
    };

    console.log("Logging API Request:", logEntry); // Debugging Log

    // Get existing logs or create a new empty array
    let storedLogs = JSON.parse(localStorage.getItem("apiLogs")) || [];

    storedLogs.push(logEntry); // Add new log entry

    localStorage.setItem("apiLogs", JSON.stringify(storedLogs)); // Save logs

    console.log("Updated localStorage:", localStorage.getItem("apiLogs")); // Verify Storage
};

const onSendRequest = async (e) => {
  e.preventDefault();
  setSending(true);
  
  let data;
  try {
      data = JSON.parse(body.toString());
  } catch (err) {
      setSending(false);
      return alert("Something wrong with JSON data!");
  }
  
  let time = new Date().getTime();
  try {
      const request = {
          url: URL.trim(),
          method,
          headers: toObject(headers),
          params: toObject(queryParams),
          data,
          id: uuidv4(),
      };

      const response = await axios(request);

      setResponse({
          ...response,
          data: detectType(response?.data),
      });

      saveToHistory(request, setHistory);

      // 🛠 Call logRequest() to store API request details
      logRequest(request.method, request.url, request.data, response.data, response.status);

  } catch (err) {
      time = new Date().getTime() - time;
      setResponse({ status: 404, customData: { time }, data: "" });
      console.log(err);

      // 🛠 Log failed request
      logRequest(method, URL, data, "Request Failed", "Error");
  } finally {
      setSending(false);
  }
};


  useEffect(() => {
    if (initialRequest) {
      try {
        setURL(initialRequest.url)
        setMethod(initialRequest.method)
        setQueryParams(reverseToKeyValue(initialRequest.params))
        setHeaders(reverseToKeyValue(initialRequest.headers))
        setInitialBody(validBody(initialRequest.data))
        setBody(validBody(initialRequest.data))

        toast.success('done', { className : "notify" })
      } catch (err) {
        toast.error('Something wrong .. please try later !!', { className : "notify" })
      } 
    }
  }, [ initialRequest ])

  return (
    <>
      <UrlInput
        urlState={[URL, setURL]}
        methodState={[method, setMethod]}
        sending={sending}
        onSendRequest={onSendRequest}
      />
      <RequestTabs
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        headers={headers}
        setHeaders={setHeaders}
        body={initialBody}
        setBody={setBody}
      />
    </>
  )};
  
