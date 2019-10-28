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
              title: 'Name',
              field: 'name',
              link: {
                url: 'user',
                param: 'id',
              },
            },
            {
              title: 'Website',
              field: 'website',
            },
            { title: 'Username', field: 'username' },
            { title: 'Email', field: 'email' },
          ]}
          data={users}
        />
      )}
    </>
  );
}
