import React, { useState } from "react";
import "./Addproduct.css";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const AddProduct = async () => {
    console.log("proudct details", productDetails);
    try {
      const formData = new FormData();
      formData.append("product", image);

      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const responseData = await response.json();

      if (responseData.success) {
        const productData = {
          ...productDetails,
          image: responseData.image_url,
        };

        const addProductResponse = await fetch(
          "http://localhost:4000/addproduct",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
          }
        );

        if (!addProductResponse.ok) {
          throw new Error("Failed to add product");
        }

        const addProductData = await addProductResponse.json();

        if (addProductData.success) {
          alert("Product Added");
        } else {
          throw new Error("Failed to add product");
        }
      } else {
        throw new Error("Server returned unsuccessful response");
      }
    } catch (error) {
      console.error("Error occurred during fetch:", error);
      alert(
        "An error occurred while adding the product. Please try again later."
      );
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
          id=""
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            id=""
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            id=""
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <div>
          <label htmlFor="">Enter the Categry</label>
          <input
            type="text"
            value={productDetails.category}
            name="category"
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumnail-img"
            alt=""
          />
          <input
            onChange={imageHandler}
            type="file"
            name="image"
            id="file-input"
            hidden
          />
        </label>
      </div>
      <button className="addproduct-btn" onClick={AddProduct}>
        Add
      </button>
    </div>
  );
};

export default AddProduct;
