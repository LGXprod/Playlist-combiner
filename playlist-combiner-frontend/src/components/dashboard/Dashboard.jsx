import React, { Component } from "react";
import Cookies from "universal-cookie";
import { Bar as BarChart, Doughnut as DoughnutChart } from "react-chartjs-2";
import { Grid, Paper, Card, CardMedia, CardContent, Typography,
Menu, MenuItem, Button } from "@material-ui/core";
import DescCard from "./DescCard";

const axios = require("axios");
const queryString = require("querystring");

class Dashboard extends Component {

    constructor() {
        super();

        let linked = false;
        let access_token = null;
        
        const cookie = new Cookies();

        this.state = {
            linked: linked,
            fName: "",
            sName: "",
            username: cookie.get("username"),
            access_token: access_token, 
            chartData: [{}, {}, {}],
            spotify_info: {},
            anchorEl: null
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

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    }

    render() {

        const options = {
            legend: {
                labels: {
                    fontColor: "#fc85ae"
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontColor: '#fc85ae'
                    }
                }],
              xAxes: [{
                    ticks: {
                        fontColor: '#fc85ae'
                    }
                }]
            }     
        }

        const doughnutOptions = {
            legend: {
                labels: {
                    fontColor: "#fc85ae"
                }
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        display: false
                    }  
                }],
                yAxes: [{
                    gridLines: {
                        display: false,
                    },
                    ticks: {
                        display: false
                    }  
                }]
            }
        }

        function islinked() {
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

        const graphStyle = {
            margin: "1.75vw",
            backgroundColor: "#574b90",
            padding: "20px"
        }

        return (
            <div>
                <h1 style={{textAlign: "center", fontSize: "5vw"}}>Spotify Mixer Dashboard</h1>
                <h3 style={{textAlign: "center", fontSize: "2.5vw"}}>
                    { "Name: " + this.state.fName + " " + this.state.sName + " | Username: " + this.state.username}
                </h3>
                
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>Options</Button>
                <Menu
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                keepMounted
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose}>Dashboard</MenuItem>
                    <MenuItem onClick={this.handleClose}>Playlist Combiner</MenuItem>
                    <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                </Menu>

                { !(this.state.linked) ? islinked() : null }

                <Grid container direction="row" justify="space-evenly" alignItems="baseline">
                    <Grid item lg={6} md={6} sm={10} xs={10}>
                        <Paper elevation={3} style={graphStyle}>
                            { this.state.linked ? <BarChart ref={this.chartReference} data={this.state.chartData[0]} options={options} /> : null }
                        </Paper>
                    </Grid>
                    <Grid item lg={6} md={6} sm={10} xs={10}>
                        <Paper elevation={3} style={graphStyle}>
                            { this.state.linked ? <DoughnutChart style={graphStyle} ref={this.chartReference} data={this.state.chartData[2]} options={doughnutOptions} /> : null }
                        </Paper>
                    </Grid>
                </Grid>

                <Paper elevation={3} style={{backgroundColor: "rgba(0,0,0,0)"}}>
                    <Grid container direction="row" justify="space-evenly" alignItems="baseline">

                        <DescCard 
                            img="https://developer.spotify.com/assets/audio/acousticness.png"
                            desc="A confidence measure from 0.0 to 1.0 of whether the track is acoustic. 1.0 represents high confidence the track is acoustic. The distribution of values for this feature look like this."
                        />

                        <DescCard 
                            img="https://developer.spotify.com/assets/audio/danceability.png"
                            desc="Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity. A value of 0.0 is least danceable and 1.0 is most danceable. The distribution of values for this feature look like this."
                        />

                        <DescCard 
                            img="https://developer.spotify.com/assets/audio/energy.png"
                            desc="Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy. The distribution of values for this feature look like this."
                        />

                        <DescCard 
                            img="https://developer.spotify.com/assets/audio/valence.png"
                            desc="A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry). The distribution of values for this feature look like this."
                        />

                        <DescCard 
                            img="https://musicmachinery.files.wordpress.com/2013/09/localhost_8000_index-html-2.png"
                            desc="Spotify only has records the genres that an artist fits into. They do not record it for songs or albums. Therefore the graph represents the top 5 genres that artists in your top 50 were classified as."
                        />

                    </Grid>
                </Paper>
                <div>
                    
                </div>
            </div>
        );

    }

    componentDidMount() {

        const url = window.location.href; 

        const self = this;
        console.log(this.state.linked)

        function saveSpotifyInfo(spotifyStats) {
            console.log(JSON.stringify(spotifyStats))
            axios.post("/saveSpotifyInfo", queryString.stringify({
                username: self.state.username,
                spotify_info: JSON.stringify(spotifyStats)
            }), {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        }

        function addData(spotifyStats, saved) {
            // console.log("loudness", averageOfFeatures.loudness)
            // console.log("tempo", averageOfFeatures.tempo)

            const genresFound = spotifyStats.genres;

            const genres = [];
            const noTimes = [];

            // for (let genre in spotifyStats.genres) {
            //     genres.push(genre);
            //     noTimes.push(spotifyStats.genres[genre]);
            // }

            function mostPopularGenre() {
                
                let max = 1;
                let maxGenre;

                for (let genre in genresFound) {
                    if (genresFound[genre] >= max) {
                        max = genresFound[genre];
                        maxGenre = genre;
                    }
                }
                
                genres.push(maxGenre);
                noTimes.push(max)

                delete genresFound[maxGenre];

            }

            for (let i = 1; i <= 5; i++) mostPopularGenre();

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

            if (!saved) saveSpotifyInfo(spotifyStats);
        }

        this.getUserInfo().then((info) => {

            this.setState({ 
                fName: info.fName,
                sName: info.sName,
                spotifyStats: info.spotify_info, 
                linked: (info.spotify_info != null ? true : false)
            });

            if (!this.state.linked) {
                
                if (url.includes("#")) {

                    const urlParams = (url.split("#")[1]).split("&");
                    self.setState({ linked: true });
        
                    for (let param of urlParams) {
                        if (param.includes("access_token")) {
                            self.setState({ access_token: param.split("=")[1] });
                            break;
                        }
                    }

                    const access_token = this.state.access_token;

                    axios.get("https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50", {
                        headers: {
                            'Authorization': 'Bearer ' + access_token
                        }
                    }).then(function(res) {

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

                                addData({ averageOfFeatures: averageOfFeatures, genres: genres }, false);
                            }

                        requestSpotify();
                   
                    }).catch(err => console.log(err));

                }
                
            } else {
                addData(JSON.parse(this.state.spotifyStats), true);
            }
        }).catch(err => console.log(err));
    }

}

export default Dashboard;