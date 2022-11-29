import { API_URL } from "./config";

async function joinTable(table: String, reporter: any) {
    const response = await fetch(`${API_URL}/join`, {
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

export default joinTable;