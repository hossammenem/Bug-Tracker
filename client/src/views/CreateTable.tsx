import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import useDocumentTitle from "../components/useDocumentTitle";
import createTable from "../api/createTable";
import getUsername from "../api/getUsername";
import swal from "sweetalert";

function Create() {
    useDocumentTitle("create");
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

    async function handleCreateTable(e: React.FormEvent){
        e.preventDefault();
        if(!isAuthenticated){
          swal("Error!", "Please login or sign up to be able to create tables.")
        } else {
          const id = await createTable(title, username);
          if(id == 400){
            swal("Error!", "Table Name Already Taken.")
          } else{
            navigate(`/T/${id}`);
          }
        }
    }

    return (
        <>
        <div className="container edited" style={{marginBottom: "-100px"}}>
          <a href="/" style={{fontSize: "20px",}}>&#8592; Back To Home</a>
        </div>
        <div className="container edited">
            <p>Create Table</p>
        </div>
        <div className="container" style={{marginTop: "50px",}}>

        <form method="POST" onSubmit={handleCreateTable}>
            <input className="form-control" placeholder="Create" value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />

            <button className="btn btn-style-1 btn-primary" type="submit" 
            style={{marginTop: "25px", float: "right"}}>Create</button>
        </form>

        </div>
    </>
    );
}

export default Create;