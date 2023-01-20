import useDocumentTitle from "../components/useDocumentTitle";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getAllReports, { TReport } from "../api/getAllReports";
import changeStatus from "../api/changeStatus";
import leaveTable from "../api/leaveTable";
import { useAuth0 } from "@auth0/auth0-react";
import getUsername from "../api/getUsername";
import getRole from "../api/fetchRole";

function Table() {
    useDocumentTitle("Table");
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [title, setTitle] = useState("");
    const [role, setRole] = useState("");
    const { tableId } = useParams()
    const [reports, setReports] = useState<TReport[]>([]);
    const { user, isAuthenticated } = useAuth0();

    useEffect(() => {
        async function getUsernameHandler(){
            if(isAuthenticated){
                const { username } = await getUsername(user?.email);
                const role = await getRole(tableId, username);
                setUsername(username);
                setRole(role)
              }
            }
        getUsernameHandler();
    }, [isAuthenticated])

    useEffect(() => {
        function addLibrary(){
            const script = document.createElement('script');
            script.src = "/static/js/table.js";
            script.async = true;
            document.body.appendChild(script);
        }
        addLibrary();
    }, []);

    useEffect(() => {
        async function fetchReports(){
            const {reports, tableTitle} = await getAllReports(window.location.pathname);
            setTitle(tableTitle);
            if (reports[0]){
                document.querySelector("td.dataTables_empty")?.classList.add("none");
            }
            setReports(reports);
        }
        fetchReports();
    }, []);

    async function handleChangeStatus(e: any){
        const { status } = await changeStatus(e.target.value);
        e.target.textContent = status;
    }

    async function handleLeaveTable(){
        await leaveTable(window.location.pathname, username);
        navigate(`/U/${username}/all-tables`);
    }

    return (
        <>
        <div className="container edited" style={{marginBottom: "-150px", fontSize: "45px"}}>
          <a href={`${window.location.pathname}`} style={{color: "#124265"}}>{title}</a>
        </div>
        <div className="container" style={{marginTop: "200px",}}>
            <table id="myTable" className="cell-border compact stripe">
                <thead>
                    <tr>
                    <th scope="col" style={{width: "30px",}}>#</th>
                    <th scope="col" style={{width: "45px",}}>Type</th>
                    <th scope="col" style={{width: "250px",}}>Title</th>
                    <th scope="col" style={{width: "65px",}}>Priority</th>
                    <th scope="col" style={{width: "140px",}}>Reporter</th>
                    <th scope="col" style={{width: "100px",}}>Date</th>
                    <th scope="col" style={{width: "60px",}}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report, index) => (
                    <tr key={report._id}>
                        <th className="dt-body-center">{index}</th>
                        <td className="dt-body-center">{report.type}</td>
                        <td><a href={`/R/${report._id}`}>{report.title}</a></td>
                        <td className="dt-body-center" data-order="report.priority">{report.priority}</td>
                        <td className="dt-body-center">{report.reporter}</td>
                        <td className="dt-body-center">{report.reportedOn.toString().substring(0, 10)}</td>
                        {role == "admin" || role == "owner" ?
                          <td className="dt-body-center" data-order="report.status">
                            <button style={{ border: "none", background: "none"}} 
                            value={report._id} onClick={handleChangeStatus}>{report.status}</button>
                          </td> :
                            <td className="dt-body-center" data-order="report.status">
                              {report.status}
                            </td>
                          }
                    </tr>
                    ))}
                </tbody>
            </table>

                <a className="btn btn-primary" href={`${window.location.pathname}/Report-Bug`} style={{color: "#fff",}}>Report A Bug</a>
                {role == "admin" || role == "owner" ? 
                <span style={{marginLeft: "20px"}}>
                  *You Can Change Any Report's Status By Clicking On It Because You Are An Admin*
                </span> : null
                }

                <br />
                <button className="btn btn-danger" onClick={handleLeaveTable} style={{color: "#fff", marginTop: "10px"}}>Leave Table</button>
                
                {role == "owner" ?
                <>
                  <span style={{marginLeft: "20px"}}>*CAUTION*: upon leaving the table as the owner, 
                  the whole table will be deleted and all data will be lost.
                  </span>
                
                <br />
                <a className="btn btn-success" href={`${window.location.pathname}/change-privileges`} style={{color: "#fff", marginTop: "10px",}}>Change Ownership</a>
                <span style={{marginLeft: "20px"}}>*only visible for table owner*</span>
                </> : null
                }
        </div> 
    </>
    );
}

export default Table;
