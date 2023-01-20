import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../components/useDocumentTitle";
import getFullReport from "../api/fullReport";
import { TReport } from "../api/getAllReports";
import changeStatus from "../api/changeStatus";
import deleteReport from "../api/deleteReport";

function FullReport() {
    useDocumentTitle("Full Report");
    const navigate = useNavigate();
    const [report, setReport] = useState<TReport>({title: "string",
        table: "string",
        reporter: "string",
        description: "string",
        reportedOn: "string",
        priority: "string",
        status: "string",
        type: "string",
        _id: "string",
    });

    useEffect(() => {
        async function fetchFullReport(){
            const getReport = await getFullReport(window.location.pathname);
            setReport(getReport);
        }
        fetchFullReport();
    }, []);

    async function handleChangeStatus(e: any){
        const { status } = await changeStatus(e.target.value);
        document.getElementsByClassName("status-child")[2].textContent = "Status: " + status
    }

    async function handleDeleteReport(e: any) {
        await deleteReport(e.target.value);
        navigate(`/T/${report.table}`);
    }
    
    return (
        <>
        <div className="container edited" style={{alignItems: "center",}}>
            <a href={`/T/${report.table}`} style={{fontSize: "20px",}}>&#8592; Back To Table</a>
        </div>
        <div style={{marginTop: "-100px",}} className="container">
            <div className="container edited" style={{alignItems: "center",}}>
                <p>Full Bug</p>
            </div>

    <div className="container" style={{marginTop: "50px",}}>
        
            <div className="col-md-12">
                <input className="form-control" readOnly value={report.title} />
            </div>

            <div className="col-md-12">
                <textarea className="form-control" readOnly rows={15} cols={10} style={{marginTop: "20px",}} value={report.description}></textarea>
            </div>

            <div className="col-md-12 container edited status" style={{ marginTop: "20px", fontSize: "20px",}}>
                <div className="status-child">Priority: {report.priority}</div>
                <div className="status-child">Type: {report.type}</div>
                <div className="status-child">Status: {report.status}</div>
            </div>
            <div className="col-12">
                <hr className="mt-2 mb-3" />
                    {/* {% if has_privilege %} */}
                    <div className="d-flex flex-wrap justify-content-between align-items-center" style={{marginBottom: "50px",}}>
                        <button value={report._id} onClick={handleDeleteReport} className="btn btn-style-1 btn-danger">Delete Report</button>
                        <div className="custom-control custom-checkbox d-block"></div>
                        <button className="btn btn-style-1 btn-success" value={report._id} onClick={handleChangeStatus}>Change Status</button>
                    </div>
                    {/* {% endif %} */}
            </div>
    </div>
</div>
        </>
    );
}

export default FullReport;