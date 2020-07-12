import React, { Component } from "react";
import Cookies from "universal-cookie";
// import { access } from "fs";
import { Bar as BarChart, Doughnut as DoughnutChart } from "react-chartjs-2";
import { request } from "https";

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
            access_token: access_token, 
            chartData: [{}, {}, {}]
        }

        this.chartReference = React.createRef();
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

        const options = {
            legend: {
                labels: {
                    fontColor: "#f8b595"
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        fontColor: '#f8b595'
                    },
                }],
              xAxes: [{
                    ticks: {
                        fontColor: '#f8b595'
                    },
                }]
            }     
        }

        const doughnutOptions = {
            legend: {
                labels: {
                    fontColor: "#f8b595"
                }
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display:false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display:false
                    }   
                }]
            }
        }

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
                    <img alt="" style={imgStyle} src={ require("../dashboard/spotify-logo.png") }/>
                    <a style={{ width: "75% ", display: "inline-block"}}
                    href={ url.href }>Your spotify account is not linked</a>
                </div>
            );
        }

        return (
            <div>
                <h1>Dashboard</h1>
                <h3>{ this.state.fName + " " + this.state.sName }</h3>
                { !(this.state.unlinked) ? isUnlinked() : null }
                { this.state.unlinked ? <BarChart ref={this.chartReference} data={this.state.chartData[0]} options={options} /> : null }
                {/* { this.state.unlinked ? <BarChart ref={this.chartReference} data={this.state.chartData[1]} options={options} /> : null } */}
                { this.state.unlinked ? <DoughnutChart ref={this.chartReference} data={this.state.chartData[2]} options={doughnutOptions} /> : null }
            </div>
        );

    }

    componentDidMount() {
        console.log(this.chartReference)

        this.getUserInfo().then((info) => {
            this.setState({ 
                fName: info.fName,
                sName: info.sName
            });

            const access_token = this.state.access_token;
            const self = this;

            if (this.state.unlinked) {
                axios.get("https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50", {
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    }
                }).then(function(res) {
                    console.log(res)
                    function addData(spotifyStats) {
                        // console.log("loudness", averageOfFeatures.loudness)
                        // console.log("tempo", averageOfFeatures.tempo)

                        const genres = [];
                        const noTimes = [];

                        for (let genre in spotifyStats.genres) {
                            genres.push(genre);
                            noTimes.push(spotifyStats.genres[genre]);
                        }

                        self.setState({
                            chartData: [
                                {
                                    labels: ["Acousticness", "Danceability", "Energy", "Happiness"],
                                    datasets: [
                                        {
                                            label: "Average percentage of spotify measures in your top 50",
                                            data: [spotifyStats.averageOfFeatures.acousticness, spotifyStats.averageOfFeatures.danceability,
                                            spotifyStats.averageOfFeatures.energy, spotifyStats.averageOfFeatures.happiness],
                                            backgroundColor: "rgba(192, 108, 132, 0.5)",
                                            borderWidth: "2",
                                            borderColor: "#f67280"
                                        }
                                    ]
                                }, self.state.chartData[1],
                                {
                                    labels: genres,
                                    datasets: [
                                        {
                                            data: noTimes,
                                            backgroundColor: "rgba(192, 108, 132, 0.5)",
                                            borderWidth: "2",
                                            borderColor: "#f67280"
                                        }
                                    ]
                                }
                            ]
                        });
                    }

                    async function requestSpotify() {
                        let averageOfFeatures = {
                            acousticness: 0,
                            danceability: 0,
                            energy: 0,
                            loudness: 0,
                            happiness: 0, 
                            tempo: 0
                        }
                        let genres = {}

                        for (var song of res.data.items) {
                            try {
                                const options = {
                                    headers: {
                                        'Authorization': 'Bearer ' + access_token
                                    }
                                }
                                const featureRes = await axios.get("https://api.spotify.com/v1/audio-features/" + song.id, options);
                                const artistRes = await axios.get("https://api.spotify.com/v1/artists/" + song.artists[0].id, options);
                                
                                averageOfFeatures.acousticness += Math.round(100*featureRes.data.acousticness/50);
                                averageOfFeatures.danceability += Math.round(100*featureRes.data.danceability/50);
                                averageOfFeatures.energy += Math.round(100*featureRes.data.energy/50);
                                averageOfFeatures.happiness += Math.round(100*featureRes.data.valence/50);
                                averageOfFeatures.loudness += featureRes.data.loudness/50;
                                averageOfFeatures.tempo += featureRes.data.tempo/50;
                                
                                for (let genre of artistRes.data.genres) {
                                    console.log(genre);
                                    if (genres.hasOwnProperty(genre)) {
                                        genres[genre] += 1;
                                    } else {
                                        genres[genre] = 1;
                                    }
                                }
                            } catch(err) {
                                console.log(err);
                            }
                        }

                        addData({ averageOfFeatures: averageOfFeatures, genres: genres });
                    }

                    requestSpotify();
                   
                }).catch(err => console.log(err));
            }
        }).catch(err => console.log(err));
    }

}

export default Dashboard;