import { config } from "dotenv";
config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as controllers from "./controllers";


const app = express();
const PORT = 5000;

app.use(cors({origin: "*",}));
app.use(express.json());

// routes
app.get('/U/:email', controllers.getUsername)
app.get('/U/:reporterName/all-tables', controllers.allTables);
app.get('/R/:reportId', controllers.getReportInfo);
app.get('/T/:tableId/all-reports', controllers.getAllReports);
app.get('/T/:tableId/all-members', controllers.getAllTableMemebers);
app.post('/T/:tableId/change-privileges', controllers.changePrivileges);
app.post('/join', controllers.join);
app.post('/create', controllers.create);
app.post('/T/:tableId/Report-Bug', controllers.createReport);
app.get('/R/:reportId/update-status', controllers.updateStatus);
app.delete('/R/:reportId/delete-report', controllers.deleteReport);
app.delete('/T/:tableId/U/:reporterName/leave', controllers.leaveTable);

mongoose.connect(process.env.MONGODB_URL!).then(() => {
    console.log(`listening on port ${PORT}`);
    app.listen(PORT);
});