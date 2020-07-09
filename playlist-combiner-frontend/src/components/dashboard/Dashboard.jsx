import React, { Component } from "react";

const axios = require("axios");

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            unlinked: false
        }
    }

    getUserInfo = () => {
        
    }

    render() {

        return (
            <h1>Dashboard</h1>
        );

    }

}

export default Dashboard;