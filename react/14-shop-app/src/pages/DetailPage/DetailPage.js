import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../../store/products/productSlice";
import styles from "./DetailPage.module.scss";

function DetailPage() {
  const { id } = useParams();
  const productId = Number(id);
  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((state) => state.productSlice);

  useEffect(() => {
    const queryOptions = {
      conditions: [{ field: "id", operator: "==", value: productId }],
    };
    dispatch(fetchProduct({ collectionName: "shop", queryOptions }));
  }, []);

  const { image, category, title, price, description } = product;
  return (
    <div className="page">
      {isLoading ? (
        "Loading..."
      ) : (
        <div className={styles.card_wrapper}>
          <div className={styles.card_img}>
            <img src={image} />
          </div>
          <div className={styles.card_description}>
            <h3>{category}</h3>
            <h1>{title}</h1>
            <h4>{price}</h4>
            <p>{description}</p>
            <div>
              <button>장바구니에 담기</button>
              <Link>장바구니로 이동</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailPage;
