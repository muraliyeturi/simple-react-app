import React, { useEffect, useState } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useNavigate } from 'react-router-dom';
import Page from 'src/components/Page';
import Budget from './Budget';
import TranscationsList from './TranscationsList';
import CategoriesList from './CategoriesList';
import Sales from './Sales';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import TotalProfit from './TotalProfit';
import Categories from './Categories';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const budgetID = window.localStorage.getItem('budgetId');
  const [budgetDetailsData, updateData] = useState({});
  const headers = { Authorization: `Bearer ${process.env.REACT_APP_APIKey}` };
  let error = false;
  let errorDetails;

  try {
    useEffect(() => {
      const getData = async () => {
        const resp = await fetch(
          `${process.env.REACT_APP_BASE}${process.env.REACT_APP_BUDGET_DETAILS_API}${budgetID}`,
          { headers }
        );
        const json = await resp.json();
        updateData(json.data.budget);
      };
      if (budgetID) {
        getData();
      } else {
        navigate('/app/manage-budget', { replace: true });
      }
    }, []);
  } catch (err) {
    error = true;
    errorDetails = err.detail;
  }
  console.log('budgetDetailsData', budgetDetailsData);

  return (
    <Page className={classes.root} title="Dashboard">
      {error && <Alert severity="error">{errorDetails}</Alert>}
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Budget
              budgetDetailsDataMonth={budgetDetailsData.months}
              setting={budgetDetailsData.currency_format}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalCustomers />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TasksProgress
              budgetDetailsDataMonth={budgetDetailsData.months}
              setting={budgetDetailsData.currency_format}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalProfit
              budgetDetailsDataMonth={budgetDetailsData.months}
              setting={budgetDetailsData.currency_format}
            />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Sales />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <Categories
              budgetDetailsDataMonth={budgetDetailsData.months}
              setting={budgetDetailsData.currency_format}
            />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <CategoriesList
              budgetDetailsDataMonth={budgetDetailsData.months}
              setting={budgetDetailsData.currency_format}
            />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <TranscationsList
              budgetedTranscations={budgetDetailsData.transactions}
              setting={budgetDetailsData.currency_format}
            />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
