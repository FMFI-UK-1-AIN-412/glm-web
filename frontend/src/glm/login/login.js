import React from "react";
import axios from "axios";
import styled from "styled-components";
import Cookies from "universal-cookie";
import GitHubLogin from "github-login";

import {
  serverUrl,
  cookiesKeys,
  githubClientId,
  githubRedirectURI,
} from "../config";

const Wrapper = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

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
    <Wrapper>
      <Header>
        <GitHubLogin
          scope={["repo"]}
          onSuccess={onSuccess}
          onFailure={onFailure}
          clientId={githubClientId}
          redirectUri={githubRedirectURI}
        />
      </Header>
    </Wrapper>
  );
}

export default Login;
