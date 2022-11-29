import { API_URL } from "./config";

async function createTable(table: String, reporter: any) {
    const response = await fetch(`${API_URL}/create`, {
        method: "POST",
        body: JSON.stringify({
            table,
            reporter,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
}

export default createTable;