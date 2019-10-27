import React, { useEffect, useState } from 'react';
import { Edit, DeleteOutline } from '@material-ui/icons';
import { Collapse } from '@material-ui/core';
import axios from 'axios';

import { useToggle } from 'hooks';
import TransactionFilters from './TransactionFilter';
import Table from 'views/components/Table';
import { Paper, PageHeader, Wrapper } from 'views/ui';

export default function TransactionsTable() {
  const [data, setData] = useState([]);
  const [open, handleToggleChange] = useToggle(true);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then(res => setData(res.data));
  }, []);

  return (
    <Paper p={2} mt={5}>
      <PageHeader
        title="Transaction Lists"
        handleToggleChange={handleToggleChange}
      />
      <Collapse in={open}>
        <TransactionFilters />
      </Collapse>
      <Wrapper mt={4}>
        <Table
          title="Showing results 100 of 2000"
          columns={[
            { title: 'Type', field: 'title' },
            { title: 'Amount', field: 'id' },
            { title: 'Mobile', field: 'userId' },
          ]}
          data={data.slice(0, 10)}
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
      </Wrapper>
    </Paper>
  );
}
