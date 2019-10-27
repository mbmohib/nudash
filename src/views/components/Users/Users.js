import React from 'react';
import Table from 'views/components/Table';

export default function Users({ users }) {
  return (
    <>
      {users && users.results && (
        <Table
          title={`Showing results ${users.results.length} of ${users.count}`}
          columns={[
            {
              title: 'Name',
              field: 'full_name',
              link: {
                url: 'user',
                param: 'id',
              },
            },
            {
              title: 'Type',
              field: 'is_freelancer',
              condition: {
                value: true,
                isPassed: 'Freelancer',
                isFailed: 'Employer',
              },
            },
            { title: 'Mobile', field: 'phone' },
            { title: 'Email', field: 'email' },
          ]}
          data={users.results}
        />
      )}
    </>
  );
}
