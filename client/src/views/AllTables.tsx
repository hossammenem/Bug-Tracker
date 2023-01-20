import useDocumentTitle from "../components/useDocumentTitle";
import { useEffect, useState } from "react";
import getAllTables, { TTable } from "../api/getAllTables";

function AllTables() {
    useDocumentTitle("All Tables");
    const [tables, setTables] = useState<TTable[]>([]);
    const [message, setMessage] = useState("");
    
    useEffect(() => {
        async function fetchTables() {
            const all = await getAllTables(window.location.pathname);
            setMessage("All Tables");
            if (!(all[0])){
                setMessage("You Haven't Created Or Joined Any Tables Yet.");
            }
            setTables(all);
        }
        fetchTables();
    }, []);

    return (
        <div style={{marginTop: "200px"}} className="container">
            <div className="container edited">
              <p>{message}</p>
            </div>
            <ul className="list-group">
            { tables.map((table) => (
                <a key={table._id} href={`/T/${table._id}`} className="list-group-item normal">{table.name}</a>
            ))}
            </ul> 
        </div>
    );
}

export default AllTables;