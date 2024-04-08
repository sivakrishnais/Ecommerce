import React, { useContext } from "react";
import "./Css/ShopCategory.css";
import Item from "../../Components/Item/Item";
import dropdown_icon from "../../Components/Assets/dropdown_icon.png";
import { ShopContext } from "../../Context/ShopContext"; // Adjust the path as needed
const ShopCategory = (props) => {
  const shopContext = useContext(ShopContext);

  const { all_product } = shopContext;

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12 </span> out of 36 Products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item, i) => {
          if (props.category === item.category) {
            return <Item {...item} />;
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">Explore more</div>
    </div>
  );
};

export default ShopCategory;
