import React, { useEffect, useState } from "react";
import "./LIstProduct.css";
import cross_icon from "../../assets/cross_icon.png";
const LIstProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const fetchInfo = async () => {
    try {
      await fetch("http://localhost:4000/allproducts")
        .then((res) => res.json())
        .then((data) => {
          setAllProducts(data);
        });
    } catch (error) {
      console.log("error is occured");
    }
  };
  const removeProduct = async (id) => {
    console.log("I am working the function");
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: {
        // Corrected from header to headers
        Accept: "application/json",
        "Content-Type": "application/json", // Corrected from content-type to Content-Type
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="container mt-5 ">
      <div className="table-responsive">
        <table className="table table-bordered  table-dark">
          <thead>
            <tr className="text-center ">
              <th className="p-4 " scope="col">
                Products
              </th>
              <th className="p-4" scope="col">
                Title
              </th>
              <th className="p-4" scope="col">
                Old Price
              </th>
              <th className="p-4" scope="col">
                New Price
              </th>
              <th className="p-4" scope="col">
                Category
              </th>
              <th className="p-4" scope="col">
                Remove
              </th>
            </tr>
          </thead>
          <tbody>
            {allproducts.map((items, index) => {
              const { name, image, category, old_price, new_price, id } = items;
              return (
                <tr key={index}>
                  <td className="align-middle text-center">
                    <img
                      src={image}
                      height="100px"
                      width="100px"
                      alt=""
                      className="img-fluid"
                    />
                  </td>
                  <td className="align-middle text-center">{name}</td>
                  <td className="align-middle text-center">{old_price}</td>
                  <td className="align-middle text-center">{new_price}</td>
                  <td className="align-middle text-center">{category}</td>
                  <td className="align-middle text-center">
                    <img
                      src={cross_icon}
                      alt=""
                      onClick={() => removeProduct(id)}
                      style={{ color: "white", cursor: "pointer" }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LIstProduct;
