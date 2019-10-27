import React from 'react';
import { connect } from 'react-redux';

import { userActions } from 'store/users';
import { Fetcher } from 'utils';
import Users from './Users';

const UsersContainer = ({ users, getUsers }) => {
  return (
    <Fetcher fetchData={getUsers} label="users" jwt>
      {() => <Users users={users} />}
    </Fetcher>
  );
};

const mapActionsToProps = {
  getUsers: userActions.getUsers,
};

const mapStateToProps = ({ users }) => ({
  users: users.users,
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(UsersContainer);
