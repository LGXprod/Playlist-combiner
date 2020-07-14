import React, { Component } from "react";
import { Grid, Card, CardMedia, CardContent, Typography } from "@material-ui/core";

class DescCard extends Component {

    render() {

        const descStyle = {
            backgroundColor: "#574b90",
            color: "#fc85ae"
        }

        const imageStyle = {
            overflow: "hidden", 
            width: "100%", 
            marginBottom: "10px", 
            border: "2.5px solid rgba(192, 108, 132, 1)",
            borderRadius: "1.5px"
        }

        return (
            <Grid item lg={2} md={10} sm={10} xs={10}>
                <Card style={descStyle} variant="outlined">
                    <CardContent>
                        <div style={imageStyle}>
                            <CardMedia style={{width: "300px", height: "150px"}} title="Distribution"
                            image={this.props.img} />
                        </div>
                        <Typography>{this.props.desc}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        );

    }

}

export default DescCard;