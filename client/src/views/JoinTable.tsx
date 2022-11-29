import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from "./useDocumentTitle";
import { useAuth0 } from "@auth0/auth0-react";
import joinTable from "../api/joinTable";
import getUsername from "../api/getUsername";

function Join() {
    useDocumentTitle("Join");
    const [title, setTitle] = useState("");
    const [username, setUsername] = useState("");
    const { user, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        async function getUsernameHandler(){
            if(isAuthenticated){
                const email = user?.email;
                const { username } = await getUsername(email);
                setUsername(username);
            }
        }
        getUsernameHandler();
    }, [isAuthenticated])

    async function handleJoinTable(e: React.FormEvent){
        e.preventDefault();
        const id = await joinTable(title, username);
        navigate(`/T/${id}`);
    }
    

    return (
    <>
    <div className="container edited">
        <p>Join Table</p>
    </div>
    <div className="container" style={{marginTop: "50px",}}>

        <form onSubmit={handleJoinTable}>
            <input className="form-control" placeholder="Join" value={title} 
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}/>
            <button className="btn btn-style-1 btn-primary" type="submit" 
            style={{marginTop: "25px", float: "right",}}>Join</button>
        </form>
    </div>
    </>
    )
}

export default Join;