import React from "react";
import styles from "./CategoryTab.module.scss";
import { useDispatch } from "react-redux";
import { setActiveCategory } from "../../../../store/categories/categoriesSlice";

function CategoryTab({ text, categoryName }) {
  const dispatch = useDispatch();
  const category = "";
  return (
    <button
      className={
        categoryName === category
          ? styles.active_category
          : styles.category_button
      }
      onClick={() => dispatch(setActiveCategory(categoryName))}
    >
      {text}
    </button>
  );
}

export default CategoryTab;
