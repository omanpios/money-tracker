import React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function Body({ transactions }) {
  function createTableRow(transaction) {
    return (
      <TableRow>
        <TableCell>{transaction.description}</TableCell>
        <TableCell>{transaction.amount}</TableCell>
        <TableCell>{transaction.date}</TableCell>
        <TableCell>{transaction.subcategory.name}</TableCell>
      </TableRow>
    );
  }
  return <TableBody>{transactions.data.map(createTableRow)}</TableBody>;
}

export default Body;
