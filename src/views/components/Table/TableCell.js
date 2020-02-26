import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { LinkIcon } from 'views/ui/icons';

const Url = styled(Link)`
  color: ${({ theme }) => theme.palette.text.primary};
  display: flex;
  align-items: center;

  svg {
    margin-left: 5px;
  }
`;

const TableCellExtended = ({ item, field, link, html, condition }) => {
  return (
    <>
      {link ? (
        <TableCell>
          <Url to={link.url + '/' + item[link.param]}>
            {condition
              ? condition.value === item[field]
                ? condition.isPassed
                : condition.isFailed
              : item[field]}
            <LinkIcon />
          </Url>
        </TableCell>
      ) : html ? (
        <TableCell dangerouslySetInnerHTML={{ __html: item[field] }} />
      ) : (
        <TableCell>
          {condition
            ? condition.value === item[field]
              ? condition.isPassed
              : condition.isFailed
            : item[field]}
        </TableCell>
      )}
    </>
  );
};

export default TableCellExtended;
