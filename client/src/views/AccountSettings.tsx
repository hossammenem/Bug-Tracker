import { useState, useEffect } from "react";
import useDocumentTitle from "../components/useDocumentTitle";
import { useAuth0 } from "@auth0/auth0-react";
import getUsername from "../api/getUsername";

function AccountSettings() {
    useDocumentTitle("Account Settings");
    const { user, isAuthenticated } = useAuth0();
    const [username, setUsername] = useState("");

    document.getElementsByTagName('body')[0].style.marginTop = "150px";

    useEffect(() => {
        async function getUsernameHandler(){
            if(isAuthenticated){
                const { username } = await getUsername(user?.email);
                setUsername(username);
            }
        }
        getUsernameHandler();
    }, [isAuthenticated])
    
    return (
        <>
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-12 pb-5">
                    <form className="row" method="POST">
                        <div className="col-md-12">
                            <div className="form-group" style={{marginBottom: "20px"}}>
                                <label htmlFor="account-fn">Username</label>
                                <input className="form-control" name="username" type="text" id="account-fn" value={username} disabled />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group" style={{marginBottom: "20px"}}>
                                <label htmlFor="account-email">E-mail Address</label>
                                <input className="form-control" name="email" type="email" id="account-email" placeholder="Add E-mail Address" 
                                value={user?.email} />
                            </div>
                        </div>
                        <div className="col-12">
                            <hr className="mt-2 mb-3" />
                            <div className="d-flex flex-wrap justify-content-between align-items-center">
                                <div className="custom-control custom-checkbox d-block">
                                </div>
                                <button className="btn btn-style-1 btn-primary" type="submit">Update Profile</button>
                            </div>
                        </div>
                    </form> 
                </div>
            </div>
        </div>
        </>
    );
}

export default AccountSettings;