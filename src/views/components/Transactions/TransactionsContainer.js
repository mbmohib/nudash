import React from 'react';
import { Collapse } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { transactionActions } from 'store/transactions';
import { useToggle } from 'hooks';
import { Fetcher } from 'utils';
import TransactionFilters from './TransactionFilter';
import TransactionsTable from './TransactionTable';
import { Paper, PageHeader, Wrapper } from 'views/ui';

const TransactionsContainer = () => {
  const [open, handleToggleChange] = useToggle(true);
  const transactions = useSelector(
    ({ transactions }) => transactions.transactions
  );
  const { getTransactions } = transactionActions;

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
        <Fetcher fetchData={getTransactions} label="transactions">
          {() => <TransactionsTable transactions={transactions} />}
        </Fetcher>
      </Wrapper>
    </Paper>
  );
};

export default TransactionsContainer;
