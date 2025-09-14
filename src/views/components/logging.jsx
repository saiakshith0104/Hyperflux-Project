import { useState, useEffect } from "react";

function Logging() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        // Load existing logs from localStorage when component mounts
        const storedLogs = JSON.parse(localStorage.getItem("apiLogs")) || [];
        setLogs(storedLogs);
    }, []);

    // Function to log API requests
    const logRequest = (method, url, requestData, responseData, status) => {
        const logEntry = {
            timestamp: new Date().toISOString(),
            method,
            url,
            requestData,
            responseData,
            status,
        };

        // Update logs state
        const updatedLogs = [...logs, logEntry];
        setLogs(updatedLogs);
        localStorage.setItem("apiLogs", JSON.stringify(updatedLogs));
    };

    // Function to download logs as JSON
    const downloadJSON = () => {
        const logs = JSON.parse(localStorage.getItem("apiLogs")) || [];
        const blob = new Blob([JSON.stringify(logs, null, 2)], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "api_logs.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Function to download logs as CSV
    const downloadCSV = () => {
        const logs = JSON.parse(localStorage.getItem("apiLogs")) || [];
        let csvContent = "Timestamp,Method,URL,Status,Request,Response\n";

        logs.forEach(log => {
            csvContent += `"${log.timestamp}","${log.method}","${log.url}","${log.status}","${JSON.stringify(log.requestData)}","${JSON.stringify(log.responseData)}"\n`;
        });

        const blob = new Blob([csvContent], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "api_logs.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return { logRequest, logs, downloadJSON, downloadCSV };
}

export default Logging;
