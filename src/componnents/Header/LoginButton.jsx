import s from "./Header.module.css";
import OAuth2Login from "react-simple-oauth2-login";
import {apiClient} from "../../api/apiClients";
import {connect} from "react-redux";
import {successAuthorization} from "../../redux/auth-reducer";


const LoginButton = (props) => {
    const onSuccess = ({ code }) => {
        console.log(code);
        let details = {
            'client_id': 'C7B53111-019B-4781-AFFF-71B6F6B0D277',
            'code': code,
            'grant_type': 'authorization_code',
            'redirect_uri': 'http://localhost:3000/oauth-callback'
        };

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch(`https://localhost:5001/connect/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
        })
            .then(res => res.json())
            .then((data) => {
                sessionStorage.setItem("access_token", data.access_token);
                apiClient.authentications = {
                    "oauth2": {
                        "type": "oauth2",
                        "accessToken": sessionStorage.getItem("access_token") || null
                    }
                };
                return data.access_token;
            })}
    ;
    const onFailure = response => console.error(response);
    return (
        <OAuth2Login
            className={s.nav_link}
            authorizationUrl='https://localhost:5001/connect/authorize'
            responseType="code"
            clientId="C7B53111-019B-4781-AFFF-71B6F6B0D277"
            redirectUri="http://localhost:3000/oauth-callback"
            scope="NotesAPI"
            onSuccess={props.successAuthorization}
            onFailure={onFailure}
            render={Login}
        />
    );
}

const Login = (props) => {
    return  <a href='#' onClick={props.onClick} className={props.className}>{props.buttonText}</a>
}

export default connect(null,{successAuthorization})(LoginButton);