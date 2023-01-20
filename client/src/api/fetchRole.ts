import { API_URL } from "./config";

async function getRole(tableId: String | undefined, reporter: String){
    const response = await fetch(`${API_URL}/getRole`, {
      method: "POST",
      body: JSON.stringify({
          tableId,
          reporter,
      }),
      headers: {
          "Content-Type": "application/json",
      },
    })
    return response.json();
}

export default getRole;