import React from "react";
import "./RelatedProduct.css";
import data_product from "../Assets/data";
import Item from "../Item/Item";
const RelatedProducts = () => {
  return (
    <div className="realtedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="realtedproducts-item">
        {data_product.map((item, i) => {
          return <Item {...item} key={i} />;
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
