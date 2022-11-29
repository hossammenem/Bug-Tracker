import { useState, useEffect  } from "react";
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from "./useDocumentTitle";
import SubmitReport from "../api/reportBug";
import { useAuth0 } from "@auth0/auth0-react";
import getUsername from "../api/getUsername";

function ReportABug() {
    useDocumentTitle("Submit A Report");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [type, setType] = useState("");
    const [username, setUsername] = useState("");
    const { user, isAuthenticated } = useAuth0();

    const navigate = useNavigate();

    useEffect(() => {
        async function getUsernameHandler(){
            if(isAuthenticated){
                const { username } = await getUsername(user?.email);
                setUsername(username);
            }
        }
        getUsernameHandler();
    }, [isAuthenticated])

    async function handleSubmitReport(e: React.FormEvent){
        e.preventDefault();
        const { table } = await SubmitReport(window.location.pathname,
            title, description, priority, type, username);
        navigate(`/T/${table}`);
    }

    return (
        <>
        <div className="container edited">
            <a href={window.location.pathname.replace("/Report-Bug", "")} style={{fontSize: "20px"}}>&#8592; Back To Table</a>
        </div>
        <div style={{marginTop: "-100px",}} className="container">
            <div className="container edited">
                <p>Report A Bug</p>
            </div>

            <div className="container" style={{marginTop: "50px"}}>
                <form className="row" method="POST" onSubmit={handleSubmitReport}>
                    <div className="col-md-12">
                        {/* {% render_field form.title className+="form-control" placeholder='Title' %} */}
                        <input type="text" className="form-control" placeholder="Title" value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
                    </div>

                    <div className="col-md-12" style={{marginTop: "20px"}}>
                        {/* {% render_field form.bug_description className+="form-control" placeholder='Bug Description'|append_attr:"type=text maxlength=250" %} */}
                        <input type="text" className="form-control" placeholder="Bug Description" maxLength={500} value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} />
                    </div>

                    <div className="col-md-6" style={{marginTop: "20px"}}>
                        <label htmlFor="account-pass">Priority</label>
                        {/* {% render_field form.priority className+="form-control" %} */}
                        <input className="form-control" value={priority}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPriority(e.target.value)} />
                    </div>
                    <div className="col-md-6" style={{margin: "20px 0px"}}>
                        <label htmlFor="account-confirm-pass">Type</label>
                        {/* {% render_field form.type className+="form-control" %} */}
                        <input className="form-control" value={type}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setType(e.target.value)} />
                    </div>

                    <div className="col-12">
                        <hr className="mt-2 mb-3" />
                            <div className="d-flex flex-wrap justify-content-between align-items-center">
                                <div className="custom-control custom-checkbox d-block"></div>
                                <button className="btn btn-style-1 btn-primary" type="submit">Submit</button>
                            </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default ReportABug;