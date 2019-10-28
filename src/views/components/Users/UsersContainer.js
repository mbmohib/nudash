import React from 'react';
import { useSelector } from 'react-redux';

import { userActions } from 'store/users';
import { Fetcher } from 'utils';
import Users from './Users';

const UsersContainer = () => {
  const users = useSelector(({ users }) => users.users);
  const { getUsers } = userActions;

  return (
    <Fetcher fetchData={getUsers} label="users">
      {() => <Users users={users} />}
    </Fetcher>
  );
};

export default UsersContainer;
