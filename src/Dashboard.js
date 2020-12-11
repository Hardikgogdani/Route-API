import React from "react";
import {useHistory} from "react-router";

const Dashboard = (props) => {
    const history = useHistory();
    const listUser = () => {
        history.push('/user');
    }
    return (
        <div className="text">
            <h1 className="h1-div"> You Successfully loged IN</h1>
            <p className="para-div">Click Below to See User Detail 😃 </p>
            <button className="btn-click-me" onClick={listUser}> Click Here</button>
        </div>
    );

}
export default Dashboard;