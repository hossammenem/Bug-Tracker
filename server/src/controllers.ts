import { Request, Response } from "express";
import Reporter from "./models/reporter";
import Table from "./models/table";
import Report from "./models/report";

export async function getReporterInfo(req: Request, res: Response) {
    const reporter = await Reporter.findOne( { "_id": req.params.reporterId });
    res.json(reporter);
}

export async function getUsername(req: Request, res: Response){
    const reporter = await Reporter.findOne({ "email": req.params.email });
    res.send({ "username" : reporter?.name} );
}

export async function allTables(req: Request, res: Response){
    const reporter = await Reporter.findOne( { "name": req.params.reporterName });
    const tables = await Table.find( {"_id": reporter?.tables});
    res.json(tables);
}

export async function getReportInfo(req: Request, res: Response) {
    const report = await Report.findOne( { "_id": req.params.reportId });
    res.send(report);
}

export async function getAllReports(req: Request, res: Response) {
    const table = await Table.findById(req.params.tableId);
    const reports = await Report.find({ "_id": table?.reports });
    res.send(reports);
}

export async function getAllTableMemebers(req: Request, res: Response){
    const table = await Table.findById(req.params.tableId);
    const reporters = await Reporter.find({ "_id": table?.reporters });
    const admins = await Reporter.find({ "_id": table?.admins });
    const owner = await Reporter.findById(table?.owner);
    res.send({
        "reporters": reporters,
        "admins": admins,
        "owner": owner,
    })
}
export async function changePrivileges(req: Request, res: Response){
    const table = await Table.findById(req.params.tableId);
    const selectedMember = await Reporter.findOne({ "name": req.body.selectedMember});
    if(table?.admins.includes(selectedMember?.id)){
        await table.updateOne( { $pull: { "admins": selectedMember?.id } } );
        await table.updateOne( { $push: { "reporters": selectedMember?.id } });
        return res.send({ 
            "updatedMember": selectedMember,
            "to": "reporter",
    });
    } else if(table?.reporters.includes(selectedMember?.id)) {
        await table.updateOne( { $pull: { "reporters": selectedMember?.id } } );
        await table.updateOne( { $push: { "admins": selectedMember?.id } });
        return res.send({
            "updatedMember": selectedMember,
            "to": "admin",
        });
    }
    res.send("something went wrong...");
}

export async function createReport(req: Request, res: Response) {
    const newReport = new Report({
        title: req.body.title,
        table: req.params.tableId,
        reporter: req.body.reporter,
        description: req.body.description,
        reportedOn: new Date(),
        priority: req.body.priority,
        status: "Open",
        type: req.body.type,
    });
    const createdReport = await newReport.save();
    
    const table = await Table.updateOne( 
        { "_id" : req.params.tableId, }, 
        { $push: { reports: createdReport?._id, },
    });
    res.send(createdReport);
}

export async function join(req: Request, res: Response){
    const reporter = await Reporter.findOne( { "name": req.body.reporter } );
    
    const table = await Table.findOneAndUpdate( { "name": req.body.table },
    { $push: {"reporters": reporter?.id} } );
    
    if (!table) return res.status(400).send("Table Not Found");
    
    await reporter?.updateOne({ $push: {"tables": table?.id} });

    res.json(table?.id);
}

export async function create(req: Request, res: Response) {
    const reporter = await Reporter.findOne( { "name": req.body.reporter } );
    const newTable = new Table({
        name: req.body.table,
        owner: reporter?.id,
    });
    const createdTable = await newTable.save();
    await reporter?.updateOne({ $push: {"tables": newTable?.id} });
    res.json(createdTable?.id);
}

export async function leaveTable(req: Request, res: Response) {
    const table = await Table.findById(req.params.tableId);
    const reporter = await Reporter.findOne( { "name": req.params.reporterName } );
    
    if ((table?.reporters.includes(reporter?.id)) || (table?.admins.includes(reporter?.id))) {
        await table.updateOne( { $pull: {"reporters": reporter?.id} } );
        await table.updateOne( { $pull: {"admins": reporter?.id} } );
        await reporter?.updateOne( {$pull: {"tables": table?.id }} );
        return res.send("Admin/Reporter has left the table");
    } else if (table?.owner == reporter?.id) {
        await table?.delete();
        return res.send("Table has been Deleted");
    }
    res.send("Something Went Wrong....");
}

export async function updateStatus(req: Request, res: Response) {
    const report = await Report.findById(req.params.reportId);
    if(report?.status == "Open"){
        await report?.updateOne( { $set: {"status" : "Pending"}} );
        res.send( { "status" : "Pending" } );
    } else if (report?.status == "Pending"){
        await report?.updateOne( { $set: {"status" : "Close"}} );
        res.send( { "status" : "Close" } );
    } else if (report?.status == "Close"){
        await report?.updateOne( { $set: {"status" : "Open"}} );
        res.send( { "status" : "Open" } );
    }
}

export async function deleteReport(req: Request, res: Response) {
    const report = await Report.findByIdAndDelete(req.params.reportId);
    res.send("Report Deleted Successfully");
}