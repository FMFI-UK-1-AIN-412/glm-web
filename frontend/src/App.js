import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import Cookies from "universal-cookie";
import { BrowserRouter as Router } from "react-router-dom";

import { cookiesKeys } from "./glm/config";
import Login from "./glm/login/login.js";
import Switch from "./glm/switch";

function App() {
  const cookies = new Cookies();
  const token = cookies.get(cookiesKeys.TOKEN);

  if (token) {
    const client = new ApolloClient({
      uri: "https://api.github.com/graphql ",
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    return (
      <ApolloProvider client={client}>
        <Router basename={process.env.PUBLIC_URL}>
          <Switch />
        </Router>
      </ApolloProvider>
    );
  } else {
    return <Login />;
  }
}

export default App;
