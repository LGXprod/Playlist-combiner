import React, { Component } from "react";
import { Grid, Card, CardMedia, CardContent, Typography } from "@material-ui/core";

class SongCard extends Component {

    render() {

        const descStyle = {
            backgroundColor: "#574b90",
            color: "#fc85ae",
            marginBottom: "20px"
        }

        const imageStyle = {
            overflow: "hidden", 
            width: "100%", 
            marginBottom: "10px", 
            border: "2.5px solid rgba(192, 108, 132, 1)",
            borderRadius: "1.5px"
        }

        return (
            <Grid item lg={5} md={10} sm={10} xs={10}>
                <Card style={descStyle} variant="outlined">
                    <CardContent>
                        <div style={imageStyle}>
                            <CardMedia style={{width: "100%", height: "300px"}} title="Distribution"
                            image={this.props.img} />
                        </div>
                        <h3>{"Track Name: " + this.props.name}</h3>
                        <h3>{"Artist(s): " + this.props.artists}</h3>
                    </CardContent>
                </Card>
            </Grid>
        );

    }

}

export default SongCard;