import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import GitHubLogin from "github-login";

import { cookiesKeys, serverUrl } from "../config";

const onSuccess = (response) => {
  getToken(response.code);
};
const onFailure = (response) => console.error(response);

const getToken = (code) => {
  console.log(code);
  axios
    .get(`${serverUrl}/authenticate/${code}`)
    .then((response) => {
      const cookies = new Cookies();
      const date = new Date();
      date.setMonth(date.getMonth() + 6);
      cookies.set(cookiesKeys.TOKEN, response.data.token, {
        path: "/",
        expires: date,
      });
      window.location.reload();
    })
    .catch((reason) => {
      window.alert("Couldn't sign in, error occured");
      console.error(reason);
    });
};

function Login() {
  return (
    <div className="App">
      <header className="App-header">
        <GitHubLogin
          clientId="45b365f9070afe431bc8"
          onSuccess={onSuccess}
          onFailure={onFailure}
          redirectUri={"http://localhost:3000/callback"}
          scope={["repo"]}
        />
      </header>
    </div>
  );
}

export default Login;
