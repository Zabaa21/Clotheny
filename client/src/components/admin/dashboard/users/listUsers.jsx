import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EnhancedTableHead from './enhancedTableHead.jsx';
import EnhancedTableToolbar from './enhancedTableToolbar.jsx';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
}));

export default function ListUsers() {
  const [rows, setRows] = useState([])
  const [allRows, setAllRows] = useState([])
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedUser, setselectedUser] = useState({})

  useEffect( () => {
    axios.get('/users').then((res) => {
      setRows(res.data)
      setAllRows(res.data)
    })
  },[])



  const peticionDelete = async () => {
    await axios.delete(`/users/${selectedUser.id}`)
    .then(response=>{
      openCloseDeleteModal();
      axios.get('/users').then((res) => {
        setRows(res.data)
        setAllRows(res.data)
      })
    }).catch(error=>{
      console.log(error);
    })
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  
  const selectProductToDelete = (row) => {
    setselectedUser(row);
    openCloseDeleteModal()
  }

  const openCloseDeleteModal=()=>{
    setModalDelete(!modalDelete);
  }

  const searchFunction = (value) => {
    setRows(allRows.filter(({ email }) => email.toLowerCase().includes(value.toLowerCase())));
  }
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const bodyDelete = (
    <div className={classes.modal}>
      <p>
        Are you sure you want to delete this Account{' '}
        <b>{selectedUser && selectedUser.email}</b>?{' '}
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDelete()}>
          Yes
        </Button>
        <Button onClick={() => openCloseDeleteModal()}>No</Button>
      </div>
    </div>
  );

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar searchFunction={searchFunction}/>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell component="th" align="left" id={labelId} scope="row">
                        {row.email}
                      </TableCell>
                      <TableCell align="left">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">
                        {row.lastName}
                      </TableCell>
                      <TableCell align="left">
                        {row.dni}
                      </TableCell>
                      <TableCell align="left">
                        {row.role ? "Admin" : "User"}
                      </TableCell>
                      <TableCell padding="checkbox">
                        <IconButton
                          aria-label="delete"
                          onClick={() => selectProductToDelete(row)}
                          className={classes.margin}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <IconButton
                          component={Link}
                          to={{
                            pathname: `/dashboard/user/${row.id}/edit`,
                            state: { product: row },
                          }}
                          aria-label="update"
                          className={classes.margin}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Modal
        open={modalDelete}
        onClose={openCloseDeleteModal}>
          {bodyDelete}
      </Modal>
    </div>
  );
}