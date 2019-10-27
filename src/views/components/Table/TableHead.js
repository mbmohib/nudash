import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import { Typography } from 'views/ui';

const TableHeadExtended = ({ columns, actions }) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map(({ title }) => (
          <TableCell key={title}>
            <Typography variant="subtitle1">{title}</Typography>
          </TableCell>
        ))}
        {actions && <TableCell key="--">--</TableCell>}
      </TableRow>
    </TableHead>
  );
};

export default TableHeadExtended;
