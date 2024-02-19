import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function CategoryCard({ category }) {
  const categoryId = category.id;

  useEffect(() => {
    async function getProvision() {
      const response = await getData(
        `http://localhost:8080/category/${categoryId}/provision`
      );
      const provision = await response.json();
      setProvision(provision.monthlyProvision);
    }
    getProvision();
  }, [categoryId]);

  const [provision, setProvision] = useState("");
  async function getData(url = "") {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  }

  return (
    <Card className="category-card" sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {category.name}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          Monthly provision: {provision}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CategoryCard;
