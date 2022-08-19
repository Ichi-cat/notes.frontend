import OAuth2Login from 'react-simple-oauth2-login'


const Login = (props) => {
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
                return data.access_token;
            })}
    ;
    const onFailure = response => console.error(response);
    return (
        <main>
            <OAuth2Login
                authorizationUrl='https://localhost:5001/connect/authorize'
                responseType="code"
                clientId="C7B53111-019B-4781-AFFF-71B6F6B0D277"
                redirectUri="http://localhost:3000/oauth-callback"
                scope="NotesAPI"
                onSuccess={onSuccess}
                onFailure={onFailure}
                render={LoginButton}
            />
        </main>
    )
};

const LoginButton = (props) => {
    console.log(props);
    return  <div onClick={props.onClick} className={props.className}>{props.buttonText}</div>
}

export default Login;