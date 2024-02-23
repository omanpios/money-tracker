import React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { currency } from "../utils/utils";

function Body({ transactions }) {
  function createTableRow(transaction) {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let date = new Date(transaction.date);
    return (
      <TableRow>
        <TableCell>{date.toLocaleDateString("en-US", options)}</TableCell>
        <TableCell>{transaction.description}</TableCell>
        <TableCell align="right">
          {currency.format(transaction.amount)}
        </TableCell>
        <TableCell>{transaction.subcategory.name}</TableCell>
      </TableRow>
    );
  }
  return <TableBody>{transactions.data.map(createTableRow)}</TableBody>;
}

export default Body;
