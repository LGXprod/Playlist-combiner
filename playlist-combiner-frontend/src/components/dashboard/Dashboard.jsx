import React, { Component } from "react";
import Cookies from "universal-cookie";

const axios = require("axios");
const queryString = require("querystring");

class Dashboard extends Component {

    constructor() {
        super();

        const cookie = new Cookies();

        this.state = {
            unlinked: false,
            fName: "",
            sName: "",
            username: cookie.get("username")
        }
    }

    getUserInfo = () => {
        return new Promise((resolve, reject) => {
            const cookie = new Cookies();

            axios.post("/userInfo", queryString.stringify({
                username: cookie.get("username")
            }), {
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function(res) {
                resolve(res.data);
            }).catch(function(err) {
                reject(err);
            });
        })
    }

    render() {

        function isUnlinked() {
            const imgStyle = { 
                width: "20% ", 
                display: "inline-block", 
                marginRight: "5%",
                verticalAlign: "top"
            }

            return (
                <div style={{ width: "25vw" }}>
                    <img style={imgStyle} src={ require("../dashboard/spotify-logo.png") }/>
                    <a style={{ width: "75% ", display: "inline-block"}}
                    href="/">Your spotify account is not linked</a>
                </div>
            );
        }
        
        return (
            <div>
                <h1>Dashboard</h1>
                <h3>{ this.state.fName + " " + this.state.sName }</h3>
                <div>
                    { !(this.state.unlinked) ? isUnlinked() : null }
                </div>
            </div>
        );

    }

    componentDidMount() {
        const self = this;
        
        this.getUserInfo().then((info) => {
            if (info.spotify_info != null) {
                this.setState({ unlinked: true });
            }
            this.setState({ 
                fName: info.fName,
                sName: info.sName
            });
        }).catch(err => console.log(err));
    }

}

export default Dashboard;