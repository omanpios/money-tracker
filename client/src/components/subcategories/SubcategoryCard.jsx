import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function SubcategoryCard() {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Subcategory name
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          Monthly provision
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          Actual amount
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SubcategoryCard;
