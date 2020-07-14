import React, { Component } from "react";
import Menu from "../menu/Menu";
import { TextField, Paper, Button, Grid } from "@material-ui/core";
import Cookies from "universal-cookie";
import SongCard from "./SongCard";
import { generateKeyPair } from "crypto";

const axios = require("axios").default;
const queryString = require("querystring");

class PlaylistCombiner extends Component {

    constructor() {
        super();

        const cookie = new Cookies();

        this.state = {
            username: cookie.get("username"),
            searchedUsername: "",
            userFound: null, 
            playlist: [],
            spotifyInfo: []
        }
    }

    updateSearchedUsername = (event) => {
        this.setState({ searchedUsername: event.target.value });
    }

    search = async() => {
        const self = this;

        function getUserInfo(username, nextUser) {
            console.log("here")
            axios.post("/userInfo", queryString.stringify({
                username: username
            }), {
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function(res) {
                
                if (res.data.userFound) {
                    const currentSpotifyInfo = self.state.spotifyInfo;
                    console.log("before", currentSpotifyInfo)
                    currentSpotifyInfo.push(JSON.parse(res.data.spotify_info));

                    self.setState({ 
                        userFound: true,
                        spotifyInfo: currentSpotifyInfo
                    });

                    console.log("after", self.state.spotifyInfo)

                    if (nextUser) getUserInfo(self.state.username, false);
                } else {
                    self.setState({ userFound: false })
                }
    
            }).catch(function(err) {
                console.log(err)
            });
        }

        getUserInfo(self.state.searchedUsername, true);
    }

    render() {

        function createPlaylist() {

            // this.search();

            if (this.state.userFound) {

                function sortGenres(spotifyInfo) {
                    let genres = [];

                    for (let genre in spotifyInfo.genreToSong) {
                        const genreInfo = {};
                        genreInfo[genre] = (spotifyInfo.genreToSong)[genre];

                        genres.push(genreInfo);
                    }

                    return genres.sort((a, b) => { return (b[Object.keys(b)]).length - (a[Object.keys(a)]).length });
                }

                const sortedGenres = {
                    searchedUser: sortGenres(this.state.spotifyInfo[0]),
                    user: sortGenres(this.state.spotifyInfo[1])
                }

                console.log("x", sortedGenres)

                let playlist = [];

                for (let userGenre of sortedGenres.user) {

                    for (let searchGenre of sortedGenres.searchedUser) {

                        if ( Object.getOwnPropertyNames(userGenre)[0] === Object.getOwnPropertyNames(searchGenre)[0] ) {
                            
                            playlist.push(userGenre[Object.keys(userGenre)[0]][0]);
                            playlist.push(userGenre[Object.keys(userGenre)[0]][1]);
                            playlist.push(userGenre[Object.keys(userGenre)[0]][2]);
                            playlist.push(searchGenre[Object.keys(searchGenre)[0]][0]);
                            playlist.push(searchGenre[Object.keys(searchGenre)[0]][1]);
                            playlist.push(searchGenre[Object.keys(searchGenre)[0]][2]);
                            break;

                        }

                    }
                    break;

                }

                this.setState({ playlist: playlist });

            }
            
        }

        const createThePlaylist = createPlaylist.bind(this);

        // createThePlaylist();

        return (
            <div>

                <h1 style={{textAlign: "center", fontSize: "3.5vw"}}>Playlist Combiner</h1>
                <Menu />

                <Paper elevation={3} style={{backgroundColor: "#574b90", width: "75%", marginLeft: "12.5%", marginRight: "12.5%", marginBottom: "2.5%", padding: "20px"}}>
                    
                    <Grid container direction="column" justify="center" alignItems="center">
                        <div style={{width: "90%"}}>
                            <TextField fullWidth style={{display: "inline-block", width: "50%", marginLeft: "25%", marginRight:"5%"}} id="outlined-basic" label="Search username" variant="outlined" onChange={this.updateSearchedUsername} />
                            <Button style={{display: "inline-block"}} variant="contained" onClick={this.search}>Submit</Button>
                        </div>
                        <div>
                            {
                                this.state.userFound != null ? 
                                (
                                    this.state.userFound ?
                                    <div>
                                        <p style={{textAlign: "center"}}>Found: {this.state.searchedUsername}</p>
                                        <Button style={{display: "inline-block"}} variant="contained" onClick={createThePlaylist}>Combine Playlist</Button>
                                    </div>
                                    :
                                    <p style={{textAlign: "center"}}>User not found.</p>
                                )
                                :
                                null
                            }
                        </div>
                    </Grid>
                    
                </Paper>

                <Paper elevation={3} style={{backgroundColor: "#574b90", width: "75%", marginLeft: "12.5%", marginRight: "12.5%", padding: "20px"}}>

                    <Grid container>
                        

                    </Grid>

                </Paper>
                
            </div>
        );
    }

}

export default PlaylistCombiner;