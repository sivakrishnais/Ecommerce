import React from "react";
import "./DescriptionBox.css";
const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="discriptionbox-navigator">
        <div className="discriptionbox-nav-box">Description</div>
        <div className="discriptionbox-nav-box">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          An e-commerce website is an online platform that facilitates buing and
          selling of products or services overthe internet serves as a vitural
          marketplace where businessess and indvidual showcase their products,
          interact with customers, and conductor transactions without the need
          for a physical presence
        </p>
        <p>
          E-commerce websites typically display products or services and
          detailed descriptions,images,prices,and any available each product
          usually has its own dedline with relvant information.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
