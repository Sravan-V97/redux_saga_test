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
import {
  FormControl,
  IconButton,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";

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

// function createData(id, name, email, address, phone, website, company) {
//   return { id, name, email, address, phone, website, company };
// }

function UserTable() {
  const classes = useStyles();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SAGA_ACTIONS.FETCH_USERS_REQUEST });
  }, []);

  const obtainedUsers = useSelector((state) => state.users);

  const [rowData, setRowdata] = useState([]);

  const editHandler = (i) => {
    let tempArray = [...rowData];
    tempArray[i].isEdit = true;
    setRowdata(tempArray);
  };

  useEffect(() => {
    for (const item of obtainedUsers) {
      item.isEdit = false;
    }
    setRowdata(obtainedUsers);
  }, [obtainedUsers]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map((item) => (
              <TableCell>{item.label}</TableCell>
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
                <IconButton aria-label="check">
                  <CheckIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserTable;
