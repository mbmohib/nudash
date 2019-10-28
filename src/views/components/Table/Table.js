import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { IconButton } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';

import { Wrapper, Typography } from 'views/ui';
import TableHead from './TableHead';
import Cell from './TableCell';

const TableExtended = ({ title, columns, data, actions }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Wrapper>
      <Typography variant="body1" mb={3}>
        {title}
      </Typography>
      <Table size="small">
        <TableHead columns={columns} actions={actions} />
        <TableBody>
          {data &&
            data.length > 0 &&
            data.map((item, index) => (
              <TableRow key={index}>
                {columns.map(({ field, condition, link }) => (
                  <Cell
                    key={field}
                    item={item}
                    field={field}
                    link={link}
                    condition={condition}
                  />
                ))}
                {actions && (
                  <TableCell>
                    {actions.map((action, index) => (
                      <IconButton
                        key={index}
                        onClick={action.handleClick}
                        disabled={eval(action.disabled)}
                      >
                        {action.icon}
                      </IconButton>
                    ))}
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Wrapper>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Wrapper>
    </Wrapper>
  );
};

export default TableExtended;
