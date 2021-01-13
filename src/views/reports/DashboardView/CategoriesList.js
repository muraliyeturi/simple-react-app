import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles({
  root: {
    height: '100%'
  },
  image: {
    height: 48,
    width: 48
  }
});

const CategoriesList = ({
  className,
  budgetDetailsDataMonth,
  setting,
  ...rest
}) => {
  const classes = useStyles();
  const budgetedMonth = budgetDetailsDataMonth
    && budgetDetailsDataMonth.find((item) => {
      return item.month === '2021-01-01';
    });

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        subtitle={`${budgetedMonth
        && budgetedMonth.categories.length} in total`}
        title="Categories"
      />
      <Divider />
      <List>
        {budgetedMonth
          && budgetedMonth.categories && (budgetedMonth.categories).slice(0, 8).map(
          (category, i) => (
            <ListItem
              divider={i < budgetedMonth.categories.length - 1}
              key={budgetedMonth.categories.id}
            >
              <ListItemText
                primary={category.name}
                secondary={`Budggeted ${category.budgeted}`}
              />
              <IconButton edge="end" size="small">
                <MoreVertIcon />
              </IconButton>
            </ListItem>
          )
        )}
      </List>
      <Divider />
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

CategoriesList.propTypes = {
  className: PropTypes.string,
  budgetDetailsDataMonth: PropTypes.array,
  setting: PropTypes.object
};

export default CategoriesList;
