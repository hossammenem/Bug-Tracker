import { API_URL } from "./config";

async function changePrivileges(pahtname: String, selectedMember: String){
    const response = await fetch(`${API_URL}${pahtname}`, {
        method: "POST",
        body: JSON.stringify({
            selectedMember,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
}

export default changePrivileges;