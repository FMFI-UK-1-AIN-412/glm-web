import React from "react";
import Cookies from "universal-cookie";
import { ListGroup } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import { cookiesKeys } from "../../config";

function Repository(props) {
  const history = useHistory();
  const { name, parent } = props;

  const selectRepository = () => {
    const cookies = new Cookies();
    const repositoryName = parent.name;
    const ownerLogin = parent.owner.login;
    cookies.set(cookiesKeys.SELECTED_REPOSITORY, repositoryName, { path: "/" });
    cookies.set(cookiesKeys.OWNER, ownerLogin, { path: "/" });
    history.push(`/${ownerLogin}/${repositoryName}`);
  };

  return (
    <ListGroup.Item action onClick={selectRepository}>
      {name}
    </ListGroup.Item>
  );
}

export default Repository;
