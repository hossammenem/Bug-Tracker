import { API_URL } from "./config";

export type TTable = {
    name: string;
    _id: string;
};

async function getAllTables(pathname: String){
    const response = await fetch(`${API_URL}${pathname}`);
    return response.json();
}

export default getAllTables;