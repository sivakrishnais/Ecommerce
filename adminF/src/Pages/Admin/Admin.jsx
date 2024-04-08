import React from "react";
import "./Admin.css";
import Sidebar from "../../Compoents/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../../Compoents/AddProduct/AddProduct";
import LIstProduct from "../../Compoents/LIstProduct/LIstProduct";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/addproduct" element={<AddProduct></AddProduct>}></Route>
        <Route path="/listproduct" element={<LIstProduct />}></Route>
      </Routes>
    </div>
  );
};

export default Admin;
