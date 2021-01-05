import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  obtainUsersAction,
  obtainUsersActionCount,
  clearUsersAction,
} from "../redux/userDucks";
import functions from "../functions";
import Empty from "./Common/Empty";
import Error from "./Common/Error";
import Loader from "./Common/Loader";
import Content from "./Container/Content";
import { Button, IconButton, Badge } from "@material-ui/core";
import "../styles/index.css";

function Users() {
  /* Redux actions */
  const dispatch = useDispatch();
  const totalUsers = useSelector((store) => store.users.total);
  const users = useSelector((store) => store.users.users);
  const loader = useSelector((store) => store.users.load);
  const error = useSelector((store) => store.users.error);
  const empty = functions.isEmpty(users);

  /* Functions */
  const obtainUsers = () => {
    dispatch(obtainUsersAction());
  };

  const obtainUsersCounter = (number) => {
    let count = number;
    dispatch(obtainUsersActionCount(count));
  };

  /* Views */
  const content = () => {
    if (loader) {
      return null;
    } else if (error) {
      return <Error />;
    } else if (empty) {
      return <Empty />;
    } else {
      return card();
    }
  };

  const buttonAction = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => obtainUsers()}
          >
            Obtain users from API
          </Button>
        </div>
        <div>
          {!functions.isEmpty(users) && (
            <IconButton onClick={() => obtainUsersCounter(20)}>
              <Badge color="secondary" badgeContent={20}>
                <Button variant="text" color="inherit">
                  Add users
                </Button>
              </Badge>
            </IconButton>
          )}
        </div>
        <div>
          {!functions.isEmpty(users) && (
            <IconButton>
              <Badge color="secondary" badgeContent={0}>
                <Button
                  variant="text"
                  color="secondary"
                  onClick={() => dispatch(clearUsersAction())}
                >
                  Clear list
                </Button>
              </Badge>
            </IconButton>
          )}
        </div>
      </div>
    );
  };

  const card = () => {
    return (
      <div>
        <ol>
          {users.map((user) => (
            <li key={user.firstname}>
              <p>{user.firstname}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  };

  return (
    <Content>
      <h1>Welcome random user</h1>
      {buttonAction()}
      {!functions.isEmpty(users) && content()}
      {loader && <Loader />}
    </Content>
  );
}

export default Users;
