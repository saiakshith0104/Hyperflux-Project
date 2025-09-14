import { useEffect, useState } from "react";
import Layout from "./views/layout/Layout";
import Request from "./views/REQUEST/Request";
import Response from "./views/RESPONSE/Response";
import History from "./views/components/History";
import { getFromHistory } from "./utils/localStorage";
import Logging from "./views/components/logging"; // Import Logging.jsx

function App() {
  const [initialRequest, setInitialRequest] = useState(null);
  const initialResponse = { data: "{\n\t\n}", atFirst: true };
  const [data, setData] = useState(initialResponse);
  const [sending, setSending] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [history, setHistory] = useState(getFromHistory());

  // Get logging functions
  const { logRequest, downloadJSON, downloadCSV } = Logging();

  return (
    <>
      <History historyTabState={[isHistoryOpen, setIsHistoryOpen]} historyState={[history, setHistory]} setInitialRequest={setInitialRequest} />
      <Layout openHistory={setIsHistoryOpen}>
        {/* Pass logRequest function to Request component to log API requests */}
        <Request 
          setResponse={setData} 
          sendingState={[sending, setSending]} 
          setHistory={setHistory} 
          initialRequest={initialRequest} 
          logRequest={logRequest} 
        />
        <Response response={data} />
        
        {/* Buttons to download logs */}
        <div className="p-4">
          <button onClick={downloadJSON} className="p-2 bg-green-500 text-white rounded ml-2">
            Download JSON Logs
          </button>
          <button onClick={downloadCSV} className="p-2 bg-orange-500 text-white rounded ml-2">
            Download CSV Logs
          </button>
        </div>
      </Layout>
    </>
  );
}

export default App;
