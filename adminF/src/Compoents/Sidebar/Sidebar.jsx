import React from "react";
import "./Sidebar.css";

import add_product from "../../assets/Product_Cart.svg";
import list_product_icon from "../../assets/Product_list_icon.svg";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={"/addproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={add_product} alt="" />
          <p>Add product</p>
        </div>
      </Link>
      <Link to={"/listproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="" />
          <p>product list</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
