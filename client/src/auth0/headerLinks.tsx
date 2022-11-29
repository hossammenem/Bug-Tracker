import { useEffect, useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import getUsername from "../api/getUsername";
import LoginButton from './loginButton';
import LogoutButton from './logoutButton';
import SignupButton from './signupButton';

const HeaderLinks = () => {
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

    return isAuthenticated ? 
    <>
        <a href="/account-settings">Account Settings</a>
        <a href={`/U/${username}/all-tables`}>Show All Tables</a>
        <a><LogoutButton /></a>
    </> 
    : 
    <>
        <a><LoginButton /></a>
        <a><SignupButton /></a>
    </>;
};

export default HeaderLinks;