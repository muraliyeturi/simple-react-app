import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik onSubmit={() => {
            navigate('/app/dashboard', { replace: true });
          }}
          >
            {({
              handleSubmit,
              isSubmitting
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Add Account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Select Account type to pull transcations
                  </Typography>
                </Box>

                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Linked
                  </Button>
                  <Typography
                    color="textPrimary"
                    variant="body2"
                  >
                    Automatically import cleared transactions for
                    easy reconciliation. U.S. and Canada only.
                  </Typography>
                </Box>
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    UnLinked
                  </Button>
                  <Typography
                    color="textPrimary"
                    variant="body2"
                  >
                    Start with your current balance and take control
                    by entering your own transactions.
                  </Typography>
                </Box>

              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
