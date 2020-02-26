import React from 'react';
import Table from 'views/components/Table';

export default function Users({ users }) {
  return (
    <>
      {users.length && (
        <Table
          title={`Showing results ${users.length} of ${users.length}`}
          columns={[
            {
              title: 'First Name',
              field: 'firstName',
            },
            {
              title: 'Last Name',
              field: 'lastName',
            },
            { title: 'Role', field: 'role' },
            { title: 'Email', field: 'email' },
            { title: 'Status', field: 'status' },
          ]}
          data={users}
        />
      )}
    </>
  );
}
