import React, { useState } from "react";
import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import { styled } from "@mui/system";

function CategoriesPage() {
  const [categoryList, setCategoryList] = useState([]);
  async function getData(url = "") {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  }

  async function handleClick() {
    const response = await getData("http://localhost:8080/category/1");
    const category = await response.json();
    setCategoryList(category);
    console.log(categoryList);
  }

  const Item = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#262B32" : "#fff",
    padding: theme.spacing(1),
    textAlign: "center",
    borderRadius: 4,
  }));

  function showCategories(category) {
    return (
      <Box sx={{ width: "100%" }}>
        <Stack spacing={2}>
          <Item>Category: {category.name}</Item>
          <Item>Category Id: {category.id}</Item>
          <Item>User Id: {category.userId}</Item>
        </Stack>
      </Box>
    );
  }

  return (
    <div>
      <button onClick={handleClick}>CategoriesPage</button>
      {categoryList.map(showCategories)}
    </div>
  );
}

export default CategoriesPage;
