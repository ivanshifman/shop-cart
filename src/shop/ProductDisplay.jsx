import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { AuthContext } from "../context/AuthProvider";

const ProductDisplay = ({ item }) => {
  const desc =
    "Discover our versatile and high-quality product, designed to meet your needs. With innovative features and a modern design, it is perfect for any occasion.";
  const { name, id, price, seller, ratingsCount, quantity, stock, img } = item;
  const [preQuantity, setPreQuantity] = useState(quantity);
  const [size, setSize] = useState("Select size");
  const [color, setColor] = useState("Select color");
  const [coupon, setCoupon] = useState("");
  const [notSelect, setNotSelect] = useState(null);
  const { user, userCart, updateUserCart } = useContext(AuthContext);

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

  useEffect(() => {
    if (size !== "Select size" && color !== "Select color") {
      setNotSelect(null);
    }
  }, [size, color]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (size === "Select size" || color === "Select color") {
      setNotSelect(
        <p className="text-danger fs-6 fw-bolder mt-3">
          Please select size and color
        </p>
      );
      return;
    }

    if (preQuantity > stock) {
      toast.error("Not enough stock available", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#E51313",
          color: "#fff",
          fontSize: "1.2rem",
          marginRight: "1rem",
        },
      });
      return;
    }

    const existingProductIndex = userCart.findIndex(
      (cartItem) => cartItem.id === id
    );

    let updatedCart;

    if (existingProductIndex !== -1) {
      updatedCart = userCart.map((cartItem, index) => {
        if (index === existingProductIndex) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + preQuantity,
            stock: cartItem.stock - preQuantity,
          };
        }
        return cartItem;
      });
    } else {
      updatedCart = [
        ...userCart,
        {
          id: id,
          img: img,
          name: name,
          price: price,
          quantity: preQuantity,
          stock: stock - preQuantity,
          size: size,
          color: color,
          coupon: coupon,
        },
      ];
    }

    const userCartRef = doc(db, "carts", user.uid);
    await setDoc(userCartRef, { cartItems: updatedCart });

    updateUserCart(updatedCart);

    toast.success(`${preQuantity} products added`, {
      duration: 3000,
      position: "top-right",
      style: {
        background: "#367F32",
        color: "#fff",
        fontSize: "1.2rem",
        marginRight: "1rem",
      },
    });

    setPreQuantity(1);
    setSize("Select size");
    setColor("Select color");
    setCoupon("");
  };

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
        {stock > 0 ? (
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
            {notSelect}
          </form>
        ) : (
          <div className="text-danger fs-3 fw-bolder">Out of stock</div>
        )}
      </div>
    </div>
  );
};

export default ProductDisplay;
