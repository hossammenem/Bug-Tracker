import { API_URL } from "./config";

async function changeStatus(reportId: String) {
    const response = await fetch(`${API_URL}/R/${reportId}/update-status`);
    return response.json();
}

export default changeStatus;