import React, { Component } from "react";
import Menu from "../menu/Menu";
import { TextField, Paper, Button } from "@material-ui/core";
import Cookies from "universal-cookie";
import SearchResults from "./SearchResults";

class PlaylistCombiner extends Component {

    constructor() {
        super();

        const cookie = new Cookies();

        this.state = {
            username: cookie.get("username"),
            searchedUsername: "",
            usersFound: null
        }
    }

    updateSearchedUsername = (event) => {
        this.setState({username: event.target.value });
    }

    search = () => {
        
    }

    render() {
        return (
            <div>

                <h1 style={{textAlign: "center", fontSize: "3.5vw"}}>Playlist Combiner</h1>
                <Menu />

                <Paper elevation={3} style={{backgroundColor: "#574b90", width: "75%", marginLeft: "12.5%", marginRight: "12.5%", padding: "20px"}}>
                    <TextField style={{width: "50%", marginLeft: "25%", marginRight:"5%"}} id="outlined-basic" 
                    label="Search username" variant="outlined" onChange={this.updateSearchedUsername} />
                    <Button variant="contained" onClick={this.search} style={{marginRight:"10%", width: "10%", height: "100%", verticalAlign: "center"}}>Submit</Button>
                    { this.state.usersFound != null ? <SearchResults /> : null }
                </Paper>
                
            </div>
        );
    }

}

export default PlaylistCombiner;