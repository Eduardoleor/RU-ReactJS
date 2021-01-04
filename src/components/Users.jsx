import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtainUsersAction, obtainUsersActionCount } from "../redux/userDucks";
import functions from "../functions";
import Empty from "./Common/Empty";
import Loader from "./Common/Loader";
import Error from "./Common/Error";

function Users() {
  const dispatch = useDispatch();
  const totalUsers = useSelector((store) => store.users.total);
  const users = useSelector((store) => store.users.users);
  const loader = useSelector((store) => store.users.load);
  const error = useSelector((store) => store.users.error);
  const empty = functions.isEmpty(users);

  const obtainUsers = () => {
    dispatch(obtainUsersAction());
  };

  const obtainUsersCounter = (number) => {
    let count = number;
    dispatch(obtainUsersActionCount(count));
  };

  const content = () => {
    if (loader) {
      return null;
    } else if (error) {
      return <Error />;
    } else if (empty) {
      return <Empty />;
    } else {
      return (
        <ol>
          {users.map((user) => (
            <li key={user.firstname}>{user.firstname}</li>
          ))}
        </ol>
      );
    }
  };

  return (
    <div>
      <h1>Users Fake</h1>
      {totalUsers > 0 && <h2>Total users {totalUsers}</h2>}
      <div>
        <button onClick={() => obtainUsers()}>Obtain users from API</button>
        {!functions.isEmpty(users) && (
          <button onClick={() => obtainUsersCounter(20)}>
            Increment users count
          </button>
        )}
      </div>
      {!functions.isEmpty(users) && content()}
      {loader && <Loader />}
    </div>
  );
}

export default Users;
