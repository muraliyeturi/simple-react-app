import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const BudgetListView = () => {
  const classes = useStyles();
  const [budgetListData, updateData] = useState([]);
  const headers = { Authorization: `Bearer ${process.env.REACT_APP_APIKey}` };
  let error = false;
  let errorDetails;
  try {
    useEffect(() => {
      const getData = async () => {
        const resp = await fetch(`${process.env.REACT_APP_BASE}${process.env.REACT_APP_BUDGET_API}`, { headers });
        const json = await resp.json();
        updateData(json.data.budgets);
      };
      getData();
    }, []);
  } catch (err) {
    error = true;
    errorDetails = err.detail;
  }

  return (
    <Page
      className={classes.root}
      title="Budget"
    >
      {error && <Alert severity="error">{errorDetails}</Alert>}
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          {budgetListData.length > 0
            && <Results budgetList={budgetListData} />}
          {budgetListData.length === 0 && <CircularProgress />}
        </Box>
      </Container>
    </Page>
  );
};

export default BudgetListView;
