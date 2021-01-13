import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const TranscationsList = ({
  className, budgetedTranscations, setting, ...rest
}) => {
  const classes = useStyles();
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Current Month Transcations" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Transcation id
                </TableCell>
                <TableCell>
                  Transcation type
                </TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {budgetedTranscations
                  && budgetedTranscations.map((transcation) => (
                    <TableRow
                      hover
                      key={transcation.id}
                    >
                      <TableCell>
                        {transcation.id}
                      </TableCell>
                      <TableCell>
                        {transcation.type}
                      </TableCell>
                      <TableCell>
                        {moment(transcation.date).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>
                        <Chip
                          color="primary"
                          label={transcation.status}
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              {budgetedTranscations
                && budgetedTranscations.length === 0
                && (
                  <span className={classes.actions.justifyContent}>
                    No Transcation available for current budget
                  </span>
                )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
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

TranscationsList.propTypes = {
  className: PropTypes.string,
  budgetedTranscations: PropTypes.array,
  setting: PropTypes.object,
};

export default TranscationsList;
