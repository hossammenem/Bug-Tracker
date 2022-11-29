import { API_URL } from "./config";

async function SubmitReport(pathname: String, title: String, description: String, priority: String,
        type: String, reporter: String) {
    const response = await fetch(`${API_URL}${pathname}`, {
        method: "POST",
        body: JSON.stringify({
            reporter,
            title,
            description,
            priority,
            type,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
}

export default SubmitReport;