import React from "react";
import { TextField, Container, Button, Grid } from "@material-ui/core";

class LoginForm extends React.Component {

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

        return (
            <Container maxWidth="xs">
                <form style={form_style}>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <img style={{width: "50%"}} alt="Logo" src={require("./logo.png")}></img>
                        <h1>Sign in</h1>
                        <TextField style={form_components_styles} InputProps={{style: {borderBlockColor: "yellow"}}} id="outlined-basic" variant="outlined" label="Username" />
                        <TextField style={form_components_styles} id="outlined-basic" variant="outlined" label="Password" />
                        <Button style={form_components_styles} variant="contained" >Submit</Button>
                    </Grid>
                </form>
                {/* <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
                {/* <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
            </Container>
        );
    }

}

export default LoginForm;