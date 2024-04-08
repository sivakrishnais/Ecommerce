import React, { useEffect, useState } from "react";
import "./NewCollections.css";

import Item from "../Item/Item";

const NewCollections = () => {
  const [new_collections, setNew_collection] = useState([]);
  const fetchUrlData = async (URL) => {
    const res = await fetch(URL);
    const data = await res.json();
    setNew_collection(data);
  };
  useEffect(() => {
    fetchUrlData("http://localhost:4000/newcollections");
  }, []);
  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collections.map((item, i) => {
          return <Item {...item} key={i} />;
        })}
      </div>
    </div>
  );
};

export default NewCollections;
