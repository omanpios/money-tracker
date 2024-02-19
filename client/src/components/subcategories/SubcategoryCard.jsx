import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function SubcategoryCard({ subcategory }) {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {subcategory.name}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          Monthly provision: {subcategory.monthlyProvision}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          Actual amount: $0
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SubcategoryCard;
