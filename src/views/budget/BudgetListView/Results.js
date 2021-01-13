import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  Radio,
  Button,
  Link,
  Modal,
  Backdrop,
  CircularProgress,
  TableContainer
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #ccc',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: '1px solid #ededed',
    padding: theme.spacing(2),
    textAlign: 'left',
    maxWidth: '90%'
  },
  modalHeader: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    marginBottom: '15px'
  }
}));

const Results = ({ className, budgetList, ...rest }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedbudgetIds, setSelectedbudgetIds] = useState([]);
  const [budgetDetailsData, budgetDetails] = useState({});
  const [limit, setLimit] = useState(10);
  let loading = false;

  const handleOpen = (budgetID) => {
    setOpen(true);
    loading = true;
    const headers = { Authorization: `Bearer ${process.env.REACT_APP_APIKey}` };

    const getBudgetDetailsData = async () => {
      const resp = await fetch(
        `${process.env.REACT_APP_BASE}${process.env.REACT_APP_BUDGET_DETAILS_API}${budgetID}`,
        { headers }
      );
      const json = await resp.json();
      budgetDetails(json.data.budget);
      loading = false;
    };
    getBudgetDetailsData();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedbudgetIds.indexOf(id);
    let newSelectedbudgetIds = [];

    if (selectedIndex === -1) {
      newSelectedbudgetIds = newSelectedbudgetIds.concat(selectedbudgetIds, id);
    } else if (selectedIndex === 0) {
      newSelectedbudgetIds = newSelectedbudgetIds.concat(
        selectedbudgetIds.slice(1)
      );
    } else if (selectedIndex === selectedbudgetIds.length - 1) {
      newSelectedbudgetIds = newSelectedbudgetIds.concat(
        selectedbudgetIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedbudgetIds = newSelectedbudgetIds.concat(
        selectedbudgetIds.slice(0, selectedIndex),
        selectedbudgetIds.slice(selectedIndex + 1)
      );
    }
    window.localStorage.setItem('budgetId', newSelectedbudgetIds);
    navigate('/app/Dashboard', { replace: true });
    setSelectedbudgetIds(newSelectedbudgetIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
        closeAfterTransition
        aria-labelledby="budget details"
        aria-describedby="budget details"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <div className={classes.paper}>
          {loading && <CircularProgress />}
          <h2 className={classes.modalHeader}>Budget Details</h2>
          <TableContainer>
            <Table className={classes.paper} aria-label="simple table">
              <TableBody>
                <TableRow key="1">
                  <TableCell align="left">Id</TableCell>
                  <TableCell align="left">{budgetDetailsData.id}</TableCell>
                </TableRow>
                <TableRow key="2">
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">{budgetDetailsData.name}</TableCell>
                </TableRow>
                <TableRow key="3">
                  <TableCell align="left">Last modified on</TableCell>
                  <TableCell align="left">
                    {budgetDetailsData.last_modified_on}
                  </TableCell>
                </TableRow>
                <TableRow key="4">
                  <TableCell align="left">First month</TableCell>
                  <TableCell align="left">
                    {budgetDetailsData.first_month}
                  </TableCell>
                </TableRow>
                <TableRow key="5">
                  <TableCell align="left">Last onth</TableCell>
                  <TableCell align="left">
                    {budgetDetailsData.last_month}
                  </TableCell>
                </TableRow>
                <TableRow key="5">
                  <TableCell align="left">Accounts</TableCell>
                  <TableCell align="left">
                    {budgetDetailsData.accounts}
                  </TableCell>
                </TableRow>
                <TableRow key="5">
                  <TableCell align="left">Payees</TableCell>
                  <TableCell align="left">
                    <Table>
                      <TableBody>
                        {budgetDetailsData.payees && budgetDetailsData.payees.map((item) => (
                          <TableRow key="51">
                            <TableCell align="left">{item.name}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>
                </TableRow>
                <TableRow key="6">
                  <TableCell align="left">Category Groups</TableCell>
                  <TableCell align="left">
                    {budgetDetailsData.category_groups
                    && budgetDetailsData.category_groups.map((item) => (
                      <i>{`${item.name}, `}</i>
                    ))}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Modal>
      <Card className={clsx(classes.root, className)} {...rest}>
        <PerfectScrollbar>
          <Box minWidth={600}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" />
                  <TableCell>Name</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Modified On</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {budgetList.map((budget) => (
                  <TableRow
                    hover
                    key={budget.id}
                    selected={selectedbudgetIds.indexOf(budget.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Radio
                        checked={selectedbudgetIds.indexOf(budget.id) !== -1}
                        onChange={(event) => handleSelectOne(event, budget.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <Box alignItems="center" display="flex">
                        <Avatar
                          className={classes.avatar}
                          src={budget.avatarUrl}
                        >
                          {getInitials(budget.name)}
                        </Avatar>
                        <Typography color="textPrimary" variant="body1">
                          <Link href="#" onClick={() => handleOpen(budget.id)}>
                            {budget.name}
                          </Link>
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {moment(budget.first_month).format(
                        `${budget.date_format.format}`
                      )}
                    </TableCell>
                    <TableCell>
                      {moment(budget.last_month).format(
                        `${budget.date_format.format}`
                      )}
                    </TableCell>
                    <TableCell>
                      {moment(budget.last_modified_on).format(
                        `${budget.date_format.format}`
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={(event) => handleSelectOne(event, budget.id)}
                      >
                        Select Budget
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={budgetList.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  budgetList: PropTypes.array.isRequired
};

export default Results;
