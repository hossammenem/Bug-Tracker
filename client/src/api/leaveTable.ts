import { API_URL } from "./config";

async function leaveTable(pathname: String, reporter: String) {
    await fetch(`${API_URL}${pathname}/U/${reporter}/leave`, { method: "Delete" });
}

export default leaveTable;