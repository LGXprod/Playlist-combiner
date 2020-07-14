import React, { Component } from "react";
import Menu from "../menu/Menu";
import { TextField } from "@material-ui/core";

class PlaylistCombiner extends Component {

    render() {
        return (
            <div>
                <h1 style={{textAlign: "center", fontSize: "3.5vw"}}>Playlist Combiner</h1>
                <Menu />

                <TextField id="outlined-basic" label="Search username" variant="outlined" />
            </div>
        );
    }

}

export default PlaylistCombiner;