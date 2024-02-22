import React, { useEffect, useState } from "react";
import SubcategoryCard from "../components/subcategories/SubcategoryCard";
import { request } from "../components/utils/utils";

function SubcategoriesPage() {
  const categoryId = 5;
  const [subcategoriesList, setSubcategoriesList] = useState([]);

  useEffect(() => {
    async function getSubcategories() {
      const response = await request(
        `http://localhost:8080/category/${categoryId}/subcategory`
      );
      const subcategories = await response.json();

      setSubcategoriesList(subcategories);
    }
    getSubcategories();
  });

  function showSubcategories(subcategory) {
    return <SubcategoryCard subcategory={subcategory}></SubcategoryCard>;
  }

  const attribute = "monthlyProvision";
  const total = subcategoriesList.reduce((acc, obj) => {
    return acc + obj[attribute];
  }, 0);

  return (
    <div>
      <h1>Test</h1>
      {subcategoriesList.map(showSubcategories)}
      <p>Total provision: {total}</p>
    </div>
  );
}

export default SubcategoriesPage;
