import React, {useState} from "react";
import { TextField, Container, Button, Grid } from "@material-ui/core";

const axios = require("axios").default; // the convention for using npm packages is to require instead of import
const queryString = require("querystring");

class LoginForm extends React.Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
        }
    }

    updateUsername = (event) => {
        this.setState({username: event.target.value});
    }

    updatePassword = (event) => {
        this.setState({password: event.target.value});
    }

    login = async (e) => {
        e.preventDefault(); // according to the W3C spec this is for browser compatibility

        console.log("username:", this.state.username)
        console.log("password:", this.state.password)

        axios.post("/login", queryString.stringify({
            username: this.state.username,
            password: this.state.password
        }), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(res) {
            console.log(res);
        }).catch(function(err) {
            console.log(err);
        });
    }

    render() {

        const form_style = {
            backgroundColor: "#f67280",
            borderRadius: "10px",
            padding: "10px",
            marginTop: "10vh"
        }

        const form_components_styles = {
            marginBottom: "10px"
        }

        // axios.get("/test").then((res) => console.log(res));

        // function updatePassword(event) {
        //     this.setState({password: event.target.value});
        // }

        return (
            <Container maxWidth="xs">
                <form style={form_style}>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <img style={{width: "50%"}} alt="Logo" src={require("./logo.png")}></img>
                        <h1 style={{textAlign: "center"}}>Sign into Spotify Mixer</h1>
                        <TextField style={form_components_styles} 
                        InputProps={{style: {borderBlockColor: "yellow"}}} id="outlined-basic" 
                        variant="outlined" label="Username" onChange={this.updateUsername} />
                        <TextField type="password" style={form_components_styles} id="outlined-basic"
                        variant="outlined" label="Password" onChange={this.updatePassword} />
                        <Button style={form_components_styles} variant="contained"
                        onClick={this.login}>Submit</Button>
                    </Grid>
                </form>
                {/* <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
                {/* <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
            </Container>
        );
    }

}

export default LoginForm;