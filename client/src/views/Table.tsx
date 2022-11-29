import useDocumentTitle from "./useDocumentTitle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getAllReports, { TReport } from "../api/getAllReports";
import changeStatus from "../api/changeStatus";
import leaveTable from "../api/leaveTable";
import { useAuth0 } from "@auth0/auth0-react";
import getUsername from "../api/getUsername";

function Table() {
    useDocumentTitle("Table");
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [reports, setReports] = useState<TReport[]>([]);
    const { user, isAuthenticated } = useAuth0();

    useEffect(() => {
        async function getUsernameHandler(){
            if(isAuthenticated){
                const { username } = await getUsername(user?.email);
                setUsername(username);
            }
        }
        getUsernameHandler();
    }, [isAuthenticated])

    useEffect(() => {
        function addLibrary(){
            const script = document.createElement('script');
            script.src = "../src/static/js/table.js";
            script.async = true;
            document.body.appendChild(script);
        }
        addLibrary();
    }, []);

    useEffect(() => {
        async function fetchReports(){
            const allReports = await getAllReports(window.location.pathname);
            if (allReports[0]){
                document.querySelector("td.dataTables_empty")?.classList.add("none");
            }
            setReports(allReports);
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
                        {/* {% if is_admin %} */}
                        <td className="dt-body-center" data-order="report.status">
                            <button style={{ border: "none", background: "none"}} 
                            value={report._id} onClick={handleChangeStatus}>{report.status}</button></td>
                        {/* {% else %} */}
                        {/* <td className="dt-body-center" data-order="report.status">report.get_status_display</td> */}
                        {/* {% endif %} */}
                    </tr>
                    ))}
                </tbody>
            </table>

                <a className="btn btn-primary" href={`${window.location.pathname}/Report-Bug`} style={{color: "#fff",}}>Report A Bug</a>
                {/* {% if is_admin %} */}
                <span style={{marginLeft: "20px"}}>*You Can Change Any Report's Status By Clicking On It Because You Are An Admin*</span>
                {/* {% endif %} */}
                <br />
                <button className="btn btn-danger" onClick={handleLeaveTable} style={{color: "#fff", marginTop: "10px"}}>Leave Table</button>

                {/* {% if is_owner %} */}
                <span style={{marginLeft: "20px"}}>*CAUTION*: upon leaving the table as the owner, 
                    the whole table will be deleted and all data will be lost.</span>

                <br />
                <a className="btn btn-success" href={`${window.location.pathname}/change-privileges`} style={{color: "#fff", marginTop: "10px",}}>Change Ownership</a>
                <span style={{marginLeft: "20px"}}>*only visible for table owner*</span>
                
                {/* {% endif %} */}

                {/* {% for message in messages %}
                        {% if message.tags == 'success' %}
                            <div className="alert alert-success" style="margin-top: 10px;">
                                <strong>{{ message }}</strong>
                            </div>
                            {% else %}
                                <div className="alert alert-danger" style="margin-top: 10px;">
                                    <strong>{{ message }}</strong>
                                </div>
                            {% endif %}
                {% endfor %} */}
        </div>
    </>
    );
}

export default Table;