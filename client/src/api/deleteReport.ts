import { API_URL } from "./config";

async function deleteReport(reportId: String){
    await fetch(`${API_URL}/R/${reportId}/delete-report`, { method: "Delete"} )
}

export default deleteReport;