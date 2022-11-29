import useDocumentTitle from "./useDocumentTitle";
import React, { useEffect, useState } from "react";
import getAllMembers, { TAdmin, TReporter } from "../api/getAllMembers";
import changePrivileges from "../api/changePrivileges";

function ChangePrivileges() {
    useDocumentTitle("Change Privileges");
    const [admins, setAdmins] = useState<TAdmin[]>([]);
    const [reporters, setReporters] = useState<TReporter[]>([]);

    useEffect(()=> {
        async function allMembers() {
            const {reporters, admins} = 
            await getAllMembers(window.location.pathname.replace("/change-privileges", ""));
            setReporters(reporters);
            setAdmins(admins);
        }
        allMembers();
    }, []);

    async function handleChangingPrivileges(e: any){
        const { updatedMember, to } = await changePrivileges(window.location.pathname, e.target.textContent);
        if(to === "admin") {
            setReporters(reporters.filter((reporter) => reporter.name !== updatedMember.name));
            setAdmins([...admins, updatedMember]);
        } else if (to === "reporter"){
            setAdmins(admins.filter((admin) => admin.name !== updatedMember.name));
            setReporters([...reporters, updatedMember]);
        }
    }

    return (
        <>
        <div className="container edited">
            <a href={window.location.pathname.replace("/change-privileges", "")} style={{fontSize: "20px",}}>&#8592; Back To Table</a>
        </div>
        <div style={{marginTop: "-100px",}} className="container">
            <div className="container edited">
                <p>Admins</p>
            </div>
                <ul className="list-group">
                    {admins.map((admin) => (
                        <button onClick={handleChangingPrivileges} className="list-group-item" key={admin._id} style={{textAlign: "left"}}>
                            {admin.name}
                        </button>
                    ))}
                </ul>
            </div>
            <div style={{marginTop: "100px",}} className="container">
                <div className="container edited">
                    <p>Reporters</p>
                </div>
                    <ul className="list-group">
                        {reporters.map((reporter) => (
                            <button onClick={handleChangingPrivileges} className="list-group-item" key={reporter._id} style={{textAlign: "left"}}>
                                {reporter.name}
                            </button>
                        ))}
                    </ul>
            </div>
        </>
    );
}

export default ChangePrivileges;