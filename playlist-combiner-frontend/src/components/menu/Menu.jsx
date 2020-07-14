import React, { Component } from "react";
import { Button, Menu as MenuElement, MenuItem } from "@material-ui/core";

class Menu extends Component {

    constructor() {
        super();

        this.state = {
            anchorEl: null
        }
    }


    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose = (item) => {
        this.setState({ anchorEl: null });
        switch(item) {
            case "dashboard":
                window.location.href = "/dashboard";
                break;
            case "playlist-combiner":
                window.location.href = "/playlist-combiner";
                break;
            default:
                console.log("nothing")
        }
    }

    render() {

        const buttonStyle = {
            position: "absolute",
            right:"15px",
            top:"15px",
            backgroundColor: "#574b90",
            color: "#fc85ae"
        }

        return (
            <div>
                <Button style={buttonStyle} aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>Options</Button>
                <MenuElement
                id="simple-menu"
                anchorEl={this.state.anchorEl}
                keepMounted
                open={Boolean(this.state.anchorEl)}
                onClose={() => this.handleClose(null)}
                >
                    <MenuItem onClick={() => this.handleClose("dashboard")} style={{backgroundColor: "#574b90", color: "#fc85ae"}}>Dashboard</MenuItem>
                    {this.props.linked ? <MenuItem onClick={() => this.handleClose("playlist-combiner")} style={{backgroundColor: "#574b90", color: "#fc85ae"}}>Playlist Combiner</MenuItem> : null}
                    <MenuItem onClick={() => this.handleClose(null)} style={{backgroundColor: "#574b90", color: "#fc85ae"}}>Logout</MenuItem>
                </MenuElement>
            </div>
        );

    }

}

export default Menu;