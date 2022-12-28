import HeaderLinks from "../auth0/headerLinks";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import getUsername from "../api/getUsername";

function Header() {
    const { user, isAuthenticated } = useAuth0();
    const [username, setUsername] = useState("");

    useEffect(() => {
        async function getUsernameHandler(){
            if(isAuthenticated){
                const { username } = await getUsername(user?.email);
                setUsername(username);
            }
        }
        getUsernameHandler();
    }, [isAuthenticated])

    return(
        <header id="header" className="fixed-top">
            <div className="container d-flex align-items-center justify-content-between">
                <h1 className="logo"><a href="/">{username}</a></h1>
                <nav id="navbar" className="navbar">
                <HeaderLinks />
                </nav>
            </div>
        </header>
    );
}

export default Header;