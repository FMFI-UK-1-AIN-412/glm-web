import React from "react";
import Cookies from "universal-cookie";

import Pulls from "./pulls/pulls";
import NavigationBar from "./navigation-bar/navigation-bar";
import Repositories from "./repositories/repositories";
import Admin from "./admin/admin";
import { cookiesKeys } from "./config";
import { Switch as RouterSwitch, Route, Redirect } from "react-router-dom";

function Switch() {
  const cookies = new Cookies();
  const selectedRepositoryName = cookies.get(cookiesKeys.SELECTED_REPOSITORY);
  const selectedRepositoryOwner = cookies.get(cookiesKeys.OWNER);

  return (
    <>
      <NavigationBar />
      <RouterSwitch>
        <Route path="/:owner/:selected_repository" component={Pulls} />
        <Route path="/repositories" component={Repositories} />
        <Route path="/admin" component={Admin} />
        <Route path="/">
          {selectedRepositoryName !== undefined &&
          selectedRepositoryOwner !== undefined ? (
            <Redirect
              to={`/${selectedRepositoryOwner}/${selectedRepositoryName}`}
            />
          ) : (
            <Redirect to="/repositories" />
          )}
        </Route>
      </RouterSwitch>
    </>
  );
}

export default Switch;
