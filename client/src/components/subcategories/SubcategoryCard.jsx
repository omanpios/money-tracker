import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { request, currency } from "../utils/utils";

function SubcategoryCard({ subcategory }) {
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    async function getBalance() {
      const response = await request(
        `http://localhost:8080/subcategory/${subcategory.id}/transaction`,
        "GET"
      );
      const balance = await response.json();
      setBalance(balance.totalAmount);
    }
    getBalance();
  });

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {subcategory.name}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          Monthly provision: {currency.format(subcategory.monthlyProvision)}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          Actual amount: {currency.format(balance)}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SubcategoryCard;
