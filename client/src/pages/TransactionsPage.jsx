import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Header from "../components/table/Header";
import Body from "../components/table/Body";
import { request } from "../components/utils/utils";

function TransactionsPage() {
  const headers = ["Description", "Amount", "Date", "Subcategory name"];
  const [transactions, setTransactions] = useState({
    totalAmount: null,
    count: null,
    data: [
      {
        id: null,
        description: null,
        amount: null,
        subcategoryId: null,
        userId: null,
        date: null,
        subcategory: {
          name: null,
        },
      },
    ],
  });

  const userId = 1;
  useEffect(() => {
    async function getSubcategories() {
      const response = await request(
        `http://localhost:8080/user/${userId}/transaction`
      );
      const subcategories = await response.json();
      setTransactions(subcategories);
    }
    getSubcategories();
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <Header headers={headers}></Header>
        <Body transactions={transactions}></Body>
      </Table>
    </TableContainer>
  );
}

export default TransactionsPage;
