import { useEffect, useState } from "react";
import Layout from "./views/layout/Layout";
import Request from "./views/REQUEST/Request";
import Response from "./views/RESPONSE/Response";
import History from "./views/components/History";
import { getFromHistory } from "./utils/localStorage";
import { fetchData } from "./utils/api"; 

function App() {
  const [initialRequest, setInitialRequest] = useState(null);
  const initialResponse = { data: "{\n\t\n}", atFirst: true };
  const [data, setData] = useState(initialResponse);
  const [sending, setSending] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [history, setHistory] = useState(getFromHistory());

  const handleFetch = () => {
    fetchData("https://jsonplaceholder.typicode.com/posts/1", setData);
  };

  return (
    <>
      <History
        historyTabState={[isHistoryOpen, setIsHistoryOpen]}
        historyState={[history, setHistory]}
        setInitialRequest={setInitialRequest}
      />
      <Layout openHistory={setIsHistoryOpen}>
        <Request
          setResponse={setData}
          sendingState={[sending, setSending]}
          setHistory={setHistory}
          initialRequest={initialRequest}
        />
        <Response response={data} />
      </Layout>

      <div className="fixed bottom-5 right-5">
        <button
          onClick={handleFetch}
          className="p-2 bg-blue-500 text-white rounded shadow-lg"
        >
          Fetch Test API
        </button>
      </div>
    </>
  );
}

export default App;
