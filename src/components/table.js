import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import { SAGA_ACTIONS } from "../services/action";
import { useEffect } from "react";
import { Container, IconButton, Snackbar, TextField } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import { Alert } from "@material-ui/lab";
import axios from "axios";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const headers = [
  {
    label: "Id",
  },
  {
    label: "Name",
  },
  {
    label: "Email Id",
  },
  {
    label: "Address",
  },
  {
    label: "Phone",
  },
  {
    label: "Website",
  },
  {
    label: "Company",
  },
];

function UserTable() {
  const classes = useStyles();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SAGA_ACTIONS.FETCH_USERS_REQUEST });
  }, []);

  const obtainedUsers = useSelector((state) => state.users);

  const [rowData, setRowdata] = useState([]);
  const [open, setOpen] = useState(false);

  const openAlert = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editHandler = (i) => {
    let tempArray = [...rowData];
    tempArray[i].isEdit = true;
    setRowdata(tempArray);
  };

  const submitHandler = (i) => {
    let tempArray = [...rowData];
    tempArray[i].isEdit = false;
    setRowdata(tempArray);

    axios
      .post(`https://jsonplaceholder.typicode.com/users`, {
        regUsers: tempArray[i],
      })
      .then((res) => {
        console.log(res);
        openAlert();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    for (const item of obtainedUsers) {
      item.isEdit = false;
    }
    setRowdata(obtainedUsers);
  }, [obtainedUsers]);

  return (
    <Container>
      <Snackbar
        style={{ height: "100%" }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" variant="filled">
          Sucessfully Updated
        </Alert>
      </Snackbar>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow style={{ backgroundColor: "greenyellow" }}>
              {headers.map((item) => (
                <TableCell style={{ fontWeight: "bold" }}>
                  {item.label}
                </TableCell>
              ))}
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((row, i) => (
              <TableRow>
                <TableCell>
                  {!row.isEdit && <span>{row.id}</span>}

                  {row.isEdit && (
                    <TextField id="id" value={row.id} variant="outlined" />
                  )}
                </TableCell>
                <TableCell>
                  {!row.isEdit && <span>{row.name}</span>}

                  {row.isEdit && (
                    <TextField id="id" value={row.name} variant="outlined" />
                  )}
                </TableCell>
                <TableCell>
                  {!row.isEdit && <span>{row.email}</span>}

                  {row.isEdit && (
                    <TextField id="id" value={row.email} variant="outlined" />
                  )}
                </TableCell>
                <TableCell>
                  {!row.isEdit && <span>{row.address.city}</span>}

                  {row.isEdit && (
                    <TextField
                      id="id"
                      value={row.address.city}
                      variant="outlined"
                    />
                  )}
                </TableCell>
                <TableCell>
                  {!row.isEdit && <span>{row.phone}</span>}

                  {row.isEdit && (
                    <TextField id="id" value={row.phone} variant="outlined" />
                  )}
                </TableCell>
                <TableCell>
                  {!row.isEdit && <span>{row.website}</span>}

                  {row.isEdit && (
                    <TextField id="id" value={row.website} variant="outlined" />
                  )}
                </TableCell>
                <TableCell>
                  {!row.isEdit && <span>{row.company.name}</span>}

                  {row.isEdit && (
                    <TextField
                      id="id"
                      value={row.company.name}
                      variant="outlined"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      editHandler(i);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="check"
                    onClick={() => {
                      submitHandler(i);
                    }}
                  >
                    <CheckIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default UserTable;
