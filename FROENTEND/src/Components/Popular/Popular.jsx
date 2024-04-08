import React, { useEffect, useState } from "react";
import "./Popular.css";

import Item from "../Item/Item";
const Popular = () => {
  const [data_product, setPopularProducts] = useState([]);
  const fetchUrlData = async (URL) => {
    const res = await fetch(URL);
    const data = await res.json();
    setPopularProducts(data);
  };
  useEffect(() => {
    fetchUrlData("http://localhost:4000/popularinwomen");
  }, []);
  return (
    <div className="popular">
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {data_product.map((item, i) => {
          return <Item key={i} {...item} />;
        })}
      </div>
    </div>
  );
};

export default Popular;
