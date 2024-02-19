import React, { useEffect, useState } from "react";
import CategoryCard from "../components/categories/CategoryCard";

function CategoriesPage() {
  useEffect(() => {
    async function getUserCategories(userId) {
      userId = 1;
      const response = await getData(
        `http://localhost:8080/user/${userId}/category`
      );
      const category = await response.json();
      setCategoryList(category);
    }

    getUserCategories();
  });

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

  function showCategories(category) {
    return (
      <CategoryCard category={category} key={category.id} id={category.id} />
    );
  }

  return (
    <div>
      <h1>Categories</h1>
      {categoryList.map(showCategories)}
    </div>
  );
}

export default CategoriesPage;
