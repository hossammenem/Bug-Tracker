import { API_URL } from "./config";

export type TReport = {
    title: string;
    table: string;
    reporter: string;
    description: string;
    reportedOn: string;
    priority: string;
    status: string;
    type: string;
    _id: string;
}

async function getAllReports(tableId: String) {
    const response = await fetch(`${API_URL}${tableId}/all-reports`);
    return response.json();
}

export default getAllReports;