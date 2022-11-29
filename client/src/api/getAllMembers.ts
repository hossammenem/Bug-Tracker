import { Key } from "react";
import { API_URL } from "./config";

export type TAdmin = {
    name: String,
    _id: Key
}

export type TReporter = {
    name: String,
    _id: Key
}

async function getAllMembers(pathname: String){
    const response = await fetch(`${API_URL}${pathname}/all-members`);
    return response.json();
}

export default getAllMembers;