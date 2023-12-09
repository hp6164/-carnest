import React, { useState } from "react";
import CreateAccount from "./CreateAccount";
import Login from "./Login";
import LaunchPage from "./LaunchPage";

export default function App(){


    const [createaccountprocess, setcreateaccountprocess] = useState(false);
    const [loginprocess, setloginprocess] = useState(false);
    const [account, setaccount] = useState(false);

    return(
        <>
        {account === false && loginprocess === false && createaccountprocess === false && <LaunchPage setcreateaccountprocess={setcreateaccountprocess} setloginprocess={setloginprocess}/>}
        {account === false && loginprocess === false && createaccountprocess === true && <CreateAccount setcreateaccountprocess={setcreateaccountprocess} setaccount={setaccount} />}
        {account === false && loginprocess === true && createaccountprocess === false && <Login setloginprocess={setloginprocess} setaccount={setaccount} />}

        </>
      );
}




