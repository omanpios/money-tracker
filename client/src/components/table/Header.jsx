import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

function Header({ headers }) {
  return (
    <TableHead>
      <TableRow>
        {headers.map((header) => {
          return <TableCell>{header}</TableCell>;
        })}
      </TableRow>
    </TableHead>
  );
}

export default Header;
