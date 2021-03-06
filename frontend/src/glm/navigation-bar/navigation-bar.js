import React from "react";
import Cookies from "universal-cookie";
import styled from "styled-components";
import { Navbar, Button, Badge } from "react-bootstrap";
import { useHistory, useRouteMatch, matchPath } from "react-router-dom";

import { cookiesKeys } from "../config";

const HeaderBadge = styled(Badge)`
  font-size: large;
`;

const HeaderButton = styled(Button)`
  margin: 0 3px;
  margin-top: 5px;
`;

const StyledNavbar = styled(Navbar)`
  background-color: white;
`;

const NavBarPadding = styled.div`
  height: 59px;
`;

function NavigationBar() {
  const cookies = new Cookies();
  const history = useHistory();
  const isAdmin = matchPath("/admin", { path: "/admin" });
  const isSelectingRepository = useRouteMatch("/repositories");
  const selectedRepositoryRoute = useRouteMatch("/:owner/:selected_repository");

  let headerTitle = "";

  if (selectedRepositoryRoute?.params?.selected_repository) {
    const params = selectedRepositoryRoute.params;
    headerTitle = (
      <HeaderButton
        href={`https://github.com/${params.owner}/${params.selected_repository}`}
      >{`Viewing ${selectedRepositoryRoute.params.selected_repository}`}</HeaderButton>
    );
  } else if (isSelectingRepository) {
    headerTitle = (
      <HeaderBadge variant="secondary">
        Select repository to view pulls
      </HeaderBadge>
    );
  } else if (isAdmin) {
    headerTitle = <HeaderBadge variant="secondary">Admin</HeaderBadge>;
  }

  return (
    <>
      <StyledNavbar collapseOnSelect expand="md" fixed="top">
        {headerTitle}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          {!isSelectingRepository ? (
            <HeaderButton onClick={() => history.push("/repositories")}>
              Select different repository
            </HeaderButton>
          ) : null}
          <HeaderButton
            variant="dark"
            onClick={() => {
              for (const [, value] of Object.entries(cookiesKeys)) {
                cookies.remove(value, { path: "/" });
              }
              window.location.href = "/";
            }}
          >
            Signed out
          </HeaderButton>
        </Navbar.Collapse>
      </StyledNavbar>
      <NavBarPadding />
    </>
  );
}

export default NavigationBar;
