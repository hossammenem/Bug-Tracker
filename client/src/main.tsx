import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

// Views
import App from './views/App';
import Header from './views/Header';
import AccountSettings from './views/AccountSettings';
import Join from "./views/JoinTable";
import Create from "./views/CreateTable";
import AllTables from './views/AllTables';
import Table from './views/Table';
import ReportABug from './views/ReportABug';
import FullReport from './views/FullReport';
import ChangePrivileges from './views/ChangePrivileges';


const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/account-settings", element: <AccountSettings /> },
  { path: "/join", element: <Join /> },
  { path: "/create", element: <Create /> },
  { path: "/U/:reporterName/all-tables", element: <AllTables /> },
  { path: "/T/:tableId", element: <Table /> },
  { path: "/T/:tableId/Report-Bug", element: <ReportABug /> },
  { path: "/R/:reportId", element: <FullReport /> },
  { path: "/T/:tableId/change-privileges", element: <ChangePrivileges /> },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-zu1hgdassv1cwy7e.eu.auth0.com"
    clientId="KkNAw2leZyq54nOZhdPx5pKZWrwBymCN"
    redirectUri={window.location.origin}
    cacheLocation="localstorage">
    <Header />
    <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
)
