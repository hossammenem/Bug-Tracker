//import { config } from "dotenv";
//config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as controllers from "./controllers";
// import { auth, requiresAuth  } from "express-openid-connect";


const app = express();
const PORT = 5000;

// const config = {
//     authRequired: false,
//     auth0Logout: true,
//     baseURL: process.env.BASE_URL,
//     clientID: process.env.CLIENT_ID,
//     issuerBaseURL: process.env.ISSUER_BASE_URL,
//     secret: process.env.SECRET,
// };
app.use(cors({origin: "*",}));
app.use(express.json());
// app.use(auth(config));

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
app.post('/getRole', controllers.getRole);
app.get('/R/:reportId/update-status', controllers.updateStatus);
app.delete('/R/:reportId/delete-report', controllers.deleteReport);
app.delete('/T/:tableId/U/:reporterName/leave', controllers.leaveTable);

// app.get('/all-tables', controllers.getAllTablesForXReporter);

mongoose.connect("mongodb+srv://bugTrackerNodejs:1eGP5QV11ltpTDY4@cluster0.wqqrnxy.mongodb.net/?retryWrites=true&w=majority").then(() => {
    console.log(`listening on port ${PORT}`);
    app.listen(PORT);
});
