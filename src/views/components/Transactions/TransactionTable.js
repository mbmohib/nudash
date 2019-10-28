import React from 'react';
import { Edit, DeleteOutline } from '@material-ui/icons';

import Table from 'views/components/Table';

export default function TransactionsTable({ transactions }) {
  console.log(transactions);
  return (
    <>
      {transactions.length && (
        <Table
          title="Showing results 100 of 2000"
          columns={[
            { title: 'ID', field: 'id' },
            { title: 'Title', field: 'title' },
            { title: 'User ID', field: 'userId' },
          ]}
          data={transactions}
          actions={[
            {
              icon: <Edit />,
              tooltip: 'Edit User',
              handleClick: (event, rowData) =>
                alert('You saved ' + rowData.name),
              disabled: false,
            },
            {
              icon: <DeleteOutline />,
              tooltip: 'Delete User',
              handleClick: (event, rowData) =>
                alert('You saved ' + rowData.name),
              disabled: 'item.id === 1',
            },
          ]}
        />
      )}
    </>
  );
}
