import React, { Component } from "react";
import { TextField, Container, Button, Grid } from "@material-ui/core";
import Cookies from "universal-cookie";

const axios = require("axios").default; // the convention for using npm packages is to require instead of import
const queryString = require("querystring");

class LoginForm extends Component {

    constructor() {
        super(); 
        this.state = {
            username: "",
            password: "",
            showIncorrect: false
        }

        // this.login = this.login.bind(this);
    }

    // whenever the username textfield's value is updated, the username is state is updated
    // to the same value
    updateUsername = (event) => {
        this.setState({username: event.target.value});
    }

    updatePassword = (event) => {
        this.setState({password: event.target.value});
    }

    login = async (e) => {
        e.preventDefault(); // according to the W3C spec this is for browser compatibility

        axios.post("/login", queryString.stringify({
            username: this.state.username,
            password: this.state.password
        }), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((function(res) {
            if (res.data.auth) {
                const cookie = new Cookies();
                let currentDate = new Date();
                
                // if the user name and password is correct we create a cookie that will act as our
                // session id and will expire after 30 minutes
                cookie.remove("username", { path: "/", expires: currentDate.setMinutes(30) });
                cookie.set("username", this.state.username, { path: "/" });

                window.location.href = "/dashboard";
            } else {
                this.setState({ showIncorrect: true });
            }
        }).bind(this)).catch(function(err) {
            console.log(err);
        });
    }

    render() {

        const form_style = {
            backgroundColor: "#574b90",
            borderRadius: "10px",
            padding: "10px",
            marginTop: "10vh"
        }

        const form_components_styles = {
            marginBottom: "10px"
        }

        return (
            <Container maxWidth="xs">
                <form style={form_style}>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <img style={{width: "50%"}} alt="Logo" src={require("./logo2.png")}></img>
                        <h1 style={{textAlign: "center"}}>Sign into Spotify Mixer</h1>
                        <TextField style={form_components_styles} id="outlined-basic" 
                        variant="outlined" label="Username" onChange={this.updateUsername} />
                        <TextField type="password" style={form_components_styles} id="outlined-basic"
                        variant="outlined" label="Password" onChange={this.updatePassword} />
                        <Button style={form_components_styles} variant="contained"
                        onClick={ this.login }>Submit</Button>
                        { this.state.showIncorrect ? <p>Username or password was incorrect.</p> : null }
                    </Grid>
                </form>
                {/* <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
                {/* <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
            </Container>
        );
    }

}

export default LoginForm;