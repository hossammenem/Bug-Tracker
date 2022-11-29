import { API_URL } from "./config";


async function getUsername(email: String|undefined){
    const response = await fetch(`${API_URL}/U/${email}`);
    return response.json();
}

export default getUsername;