import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  makeStyles,
  Button,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
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
  },
  gutter: {
    marginRight: '15px',
  }
}));

const TranscationsListView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const budgetID = window.localStorage.getItem('budgetId');
  const [transcationListData, updateData] = useState([]);
  const headers = { Authorization: `Bearer ${process.env.REACT_APP_APIKey}` };
  let error = false;
  let errorDetails;
  try {
    useEffect(() => {
      const getData = async () => {
        const resp = await fetch(`${process.env.REACT_APP_BASE}${process.env.REACT_APP_BUDGET_API}/${budgetID}/transactions`, { headers });
        const json = await resp.json();
        updateData(json.data.transactions);
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

  return (
    <Page
      className={classes.root}
      title="Budget"
    >
      {error && <Alert severity="error">{errorDetails}</Alert>}
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          {transcationListData.length > 0
            && <Results transcationList={transcationListData} />}
          {transcationListData.length === 0
            && (
              <div>
                <span className={classes.gutter}> No Transcation found</span>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => { navigate('/app/manage-budget', { replace: true }); }}
                >
                  Manage Budget
                </Button>
              </div>
            )}
        </Box>
      </Container>
    </Page>
  );
};

export default TranscationsListView;
