import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56
  }
}));

const TasksProgress = ({
  className, budgetDetailsDataMonth, setting, ...rest
}) => {
  const classes = useStyles();
  const budgetedAmount = budgetDetailsDataMonth
      && budgetDetailsDataMonth.find((item) => {
        return item.month === '2021-01-01';
      });

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              TOTAL AVAILABLE
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {setting && setting.currency_symbol}
              {budgetedAmount && budgetedAmount.to_be_budgeted}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box mt={3}>
          <LinearProgress
            value={75.5}
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

TasksProgress.propTypes = {
  className: PropTypes.string,
  budgetDetailsDataMonth: PropTypes.array,
  setting: PropTypes.object,
};

export default TasksProgress;
