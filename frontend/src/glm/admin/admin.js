import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Cookies from "universal-cookie";

import { cookiesKeys } from "../config";
import AdminPulls from "./admin-pulls";

const CenteredParagraph = styled.p`
  text-align: center;
`;

function Admin() {
  const cookies = new Cookies();
  const token = cookies.get(cookiesKeys.TOKEN, "not-admin");

  const [students, setStudents] = useState([]);
  const [owner, setOwner] = useState("");
  const [repoPrefix, setRepoPrefix] = useState("");
  const [isError, setIsError] = useState(false);

  const setCookies = (students, owner, repoPrefix) => {
    cookies.set(cookiesKeys.STUDENTS, students, { path: "/" });
    cookies.set(cookiesKeys.OWNER, owner, { path: "/" });
    cookies.set(cookiesKeys.REPO_PREFIX, repoPrefix, { path: "/" });
  };

  const setStates = (students, owner, repoPrefix) => {
    setStudents(students);
    setOwner(owner);
    setRepoPrefix(repoPrefix);
  };

  useEffect(() => {
    const students = cookies.get(cookiesKeys.STUDENTS);
    const owner = cookies.get(cookiesKeys.OWNER);
    const repoPrefix = cookies.get(cookiesKeys.REPO_PREFIX);

    if (students && owner && repoPrefix) {
      setStates(students, owner, repoPrefix);
    } else {
      axios
        .get(`https://localhost:9998/config/${token}`)
        .then((response) => {
          const { data } = response;
          setCookies(data.students, data.owner, data.repoPrefix);
          setStates(data.students, data.owner, data.repoPrefix);
        })
        .catch(() => {
          setIsError("true");
        });
    }
  }, []);

  if (isError) {
    return <CenteredParagraph>FAILED YOU ARE NOT AN ADMIN</CenteredParagraph>;
  }

  if (students.length === 0) {
    return <CenteredParagraph>Loading</CenteredParagraph>;
  }

  return students.map((student) => (
    <AdminPulls
      key={student}
      student={student}
      owner={owner}
      repoPrefix={repoPrefix}
    />
  ));
}

export default Admin;
