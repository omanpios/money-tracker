import React, { useEffect, useState } from "react";
import CategoryCard from "../components/categories/CategoryCard";
import { request } from "../components/utils/api";

function CategoriesPage() {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    async function getUserCategories(userId) {
      userId = 1;
      const response = await request(
        `http://localhost:8080/user/${userId}/category`,
        "GET"
      );
      const categories = await response.json();
      setCategoryList(categories);
    }
    getUserCategories();
  });

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
