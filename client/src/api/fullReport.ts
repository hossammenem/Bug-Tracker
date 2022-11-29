import { API_URL } from "./config";

async function getFullReport(reportId: String){
    const response = await fetch(`${API_URL}${reportId}`);
    return response.json();
}

export default getFullReport;