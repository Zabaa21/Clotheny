import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";
import React from "react";

const headCells = [
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  { id: "name", numeric: false, disablePadding: false, label: "Name" },
  { id: "lastName", numeric: false, disablePadding: false, label: "Last Name" },
  { id: "dni", numeric: false, disablePadding: false, label: "DNI" },
  { id: "role", numeric: true, disablePadding: false, label: "Role" },
  { id: "delete", numeric: false, disablePadding: false, label: "" },
  { id: "edit", numeric: false, disablePadding: false, label: "" },
];

function EnhancedTableHead(props) {
  const {
    classes,
    order,
    orderBy,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => {
          if (headCell.id !== "edit" && headCell.id !== "delete") {
            return (
              <TableCell
                key={headCell.id}
                align={"left"}
                padding={headCell.disablePadding ? "none" : "default"}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            );
          } else {
            return <TableCell key={headCell.id}></TableCell>;
          }
        })}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;
