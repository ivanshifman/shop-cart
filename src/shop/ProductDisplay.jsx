import { useState } from "react";
import { Link } from "react-router-dom";

const ProductDisplay = ({ item }) => {
  const desc =
    "Discover our versatile and high-quality product, designed to meet your needs. With innovative features and a modern design, it is perfect for any occasion.";

  const { name, id, price, seller, ratingsCount, quantity, stock, img } = item;
  const [preQuantity, setPreQuantity] = useState(quantity);
  const [size, setSize] = useState("Select size");
  const [color, setColor] = useState("Select color");
  const [coupon, setCoupon] = useState("");

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleDecrease = () => {
    if (preQuantity > 1) {
      setPreQuantity(preQuantity - 1);
    }
  };

  const handleIncrease = () => {
    if (preQuantity < stock) {
      setPreQuantity(preQuantity + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (size === "Select size" || color === "Select color") {
        console.log("Please select size and color");
        return;
      }

    const product = {
        id: id,
        img: img,
        name: name,
        price: price,
        quantity: preQuantity,
        size: size,
        color: color,
        coupon: coupon
    }

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProductIndex = existingCart.findIndex((item) => item.id === id);

    if(existingProductIndex !== -1) {
        existingCart[existingProductIndex].quantity += preQuantity;
    } else {
        existingCart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    setPreQuantity(1);
    setSize("Select size");
    setColor("Select color");
    setCoupon("");
  }

  return (
    <div>
      <div>
        <h4>{name}</h4>
        <p className="rating">
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <i className="icofont-star"></i>
          <span className="ms-2">{ratingsCount} review </span>
        </p>
        <h4>${price}</h4>
        <h6>{seller}</h6>
        <p>{desc}</p>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="select-product size">
            <select value={size} onChange={handleSizeChange} required>
              <option disabled>Select size</option>
              <option>SM</option>
              <option>MD</option>
              <option>LG</option>
              <option>XL</option>
              <option>XXL</option>
            </select>
            <i className="icofont-rounded-down"></i>
          </div>
          <div className="select-product color">
            <select value={color} onChange={handleColorChange} required>
              <option disabled>Select color</option>
              <option>Black</option>
              <option>Blue</option>
              <option>Grey</option>
              <option>Red</option>
              <option>White</option>
            </select>
            <i className="icofont-rounded-down"></i>
          </div>

          <div className="cart-plus-minus">
            <div className="dec qtybutton" onClick={handleDecrease}>
              -
            </div>
            <input
              className="cart-plus-minus-box"
              type="text"
              name="qtybutton"
              id="qtybutton"
              value={preQuantity}
              readOnly
            />
            <div className="inc qtybutton" onClick={handleIncrease}>
              +
            </div>
          </div>

          <div className="discount-code mb-2">
            <input
              type="text"
              placeholder="Enter discount code"
              onChange={(e) => setCoupon(e.target.value)}
            />
          </div>

          <button type="submit" className="lab-btn">
            <span>Add to cart</span>
          </button>
          <Link to="/cart-page" className="lab-btn bg-primary">
            <span>Check out</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ProductDisplay;
