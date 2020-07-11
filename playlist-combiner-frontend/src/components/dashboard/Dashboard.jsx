import React, { Component } from "react";
import Cookies from "universal-cookie";
import { access } from "fs";

const axios = require("axios");
const queryString = require("querystring");

class Dashboard extends Component {

    constructor() {
        super();

        let unlinked = false;
        let access_token = null;
        const url = window.location.href; 

        if (url.includes("#")) {
            const urlParams = (url.split("#")[1]).split("&");
            unlinked = true;

            for (let param of urlParams) {
                if (param.includes("access_token")) {
                    access_token = param.split("=")[1];
                    break;
                }
            }
        }
        
        const cookie = new Cookies();

        this.state = {
            unlinked: unlinked,
            fName: "",
            sName: "",
            username: cookie.get("username"),
            access_token: access_token
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

            let url = new URL("https://accounts.spotify.com/authorize");
            url.searchParams.append("client_id", "038ccb80d4594efa85ae15a36e4e30af");
            url.searchParams.append("response_type", "token");
            url.searchParams.append("redirect_uri", "http://localhost:3000/dashboard");
            url.searchParams.append("scope", encodeURIComponent("playlist-modify-public user-top-read"));
            console.log(url.href)

            return (
                <div style={{ width: "25vw" }}>
                    <img style={imgStyle} src={ require("../dashboard/spotify-logo.png") }/>
                    <a style={{ width: "75% ", display: "inline-block"}}
                    href={ url.href }>Your spotify account is not linked</a>
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
            this.setState({ 
                fName: info.fName,
                sName: info.sName
            });

            const access_token = this.state.access_token;

            if (this.state.unlinked) {
                axios.get("https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50", {
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    }
                }).then(function(res) {
                    // console.log(res)
                    for (var song of res.data.items) {
                        axios.get("https://api.spotify.com/v1/audio-features/" + song.id, {
                            headers: {
                                'Authorization': 'Bearer ' + access_token
                            }
                        }).then(function(featuresRes) {
                            console.log(featuresRes)
                        }).catch(err => console.log(err));
                    }
                }).catch(err => console.log(err));
            }
        }).catch(err => console.log(err));
    }

}

export default Dashboard;