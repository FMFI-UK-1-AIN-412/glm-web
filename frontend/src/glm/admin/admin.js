import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Cookies from "universal-cookie";
import { Table } from "react-bootstrap";

import { serverUrl } from "../config";
import { cookiesKeys } from "../config";
import StudentSubmissions from "./student-submissions";

const CenteredParagraph = styled.p`
  text-align: center;
`;

const CenteredTableHeader = styled.th`
  text-align: center;
`;

function Admin() {
  const cookies = new Cookies();
  const token = cookies.get(cookiesKeys.TOKEN, "not-admin");

  const [students, setStudents] = useState([]);
  const [owner, setOwner] = useState("");
  const [repoPrefix, setRepoPrefix] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [isError, setIsError] = useState(false);

  const setCookies = (students, owner, repoPrefix, assignments) => {
    cookies.set(cookiesKeys.STUDENTS, students, { path: "/" });
    cookies.set(cookiesKeys.OWNER, owner, { path: "/" });
    cookies.set(cookiesKeys.REPO_PREFIX, repoPrefix, { path: "/" });
    cookies.set(cookiesKeys.ASSIGNMENTS, assignments, { path: "/" });
  };

  const setStates = (students, owner, repoPrefix, assignments) => {
    setStudents(students);
    setOwner(owner);
    setRepoPrefix(repoPrefix);
    setAssignments(assignments);
  };

  useEffect(() => {
    const students = cookies.get(cookiesKeys.STUDENTS);
    const owner = cookies.get(cookiesKeys.OWNER);
    const repoPrefix = cookies.get(cookiesKeys.REPO_PREFIX);
    const assignments = cookies.get(cookiesKeys.ASSIGNMENTS);

    if (students && owner && repoPrefix && assignments) {
      setStates(students, owner, repoPrefix, assignments);
    } else {
      axios
        .get(`${serverUrl}/config/${token}`)
        .then((response) => {
          const { data } = response;
          setCookies(
            data.students,
            data.owner,
            data.repoPrefix,
            data.assignments
          );
          setStates(
            data.students,
            data.owner,
            data.repoPrefix,
            data.assignments
          );
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

  return (
    <Table striped={true} responsive={true} bordered={false}>
      <thead>
        <tr>
          <th>Name</th>
          {assignments.map((assignment) => (
            <CenteredTableHeader key={assignment}>
              {assignment}
            </CenteredTableHeader>
          ))}
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <StudentSubmissions
            assignments={assignments}
            key={student}
            student={student}
            owner={owner}
            repoPrefix={repoPrefix}
          />
        ))}
      </tbody>
    </Table>
  );
}

export default Admin;
