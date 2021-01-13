import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';
import MoneyIcon from '@material-ui/icons/MonetizationOn';

const useStyles = makeStyles({
  root: {
    height: '100%'
  },
  blockLegend: {
    display: 'block',
  }
});

const Categories = ({
  className,
  budgetDetailsDataMonth,
  setting,
  ...rest
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const budgetedMonth = budgetDetailsDataMonth
    && budgetDetailsDataMonth.find((item) => {
      return item.month === '2021-01-01';
    });

  const data = {
    datasets: [
      {
        data: [10, 14, 19, 20, 48, 50, 69, 91],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600],
          colors.yellow[600],
          colors.green[600],
          colors.blue[600],
          colors.purple[600],
          colors.indigo[300]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['cat1', 'cat2', 'cat3']
  };

  const options = {
    animation: true,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Current Spend By Category" />
      <Divider />
      <CardContent>
        <Box height={300} position="relative">
          <Doughnut data={data} options={options} />
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          {budgetedMonth && budgetedMonth.categories.slice(0, 8).map(
            ({
              color, name, budgeted
            }) => (
              <div key={name} p={1} textAlign="center" className={classes.blockLegend}>
                <MoneyIcon color="action" />
                <Typography color="textPrimary" variant="body1">
                  {name}
                </Typography>
                <Typography style={{ color }} variant="h2">
                  {budgeted}
                  %
                </Typography>
              </div>
            )
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

Categories.propTypes = {
  className: PropTypes.string,
  budgetDetailsDataMonth: PropTypes.array,
  setting: PropTypes.object
};

export default Categories;
