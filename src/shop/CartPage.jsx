import { useContext, useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";
import delImgUrl from "../assets/images/shop/del.png";
import CheckOutPage from "./CheckOutPage";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";
import { db } from "../firebase/firebase.config";
import { doc, setDoc } from "firebase/firestore";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const [validDiscount, setValidDiscount] = useState(false);
  const { user, userCart, updateUserCart } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setCartItems(userCart);
    }
  }, [user, userCart]);

  useEffect(() => {
    if (selectedCountry === "ar") {
      setCities(["Buenos Aires"]);
    } else if (selectedCountry === "usa") {
      setCities(["New York"]);
    } else if (selectedCountry === "uk") {
      setCities(["London"]);
    } else {
      setCities([]);
    }
  }, [selectedCountry]);

  const calculateTotalPrice = (item) => {
    const price = validDiscount ? item.price * 0.9 : item.price;
    return price * item.quantity;
  };

  const handleIncrease = (item) => {
    if (item.stock > 0) {
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
              stock: cartItem.stock - 1,
            }
          : cartItem
      );
      setCartItems(updatedCart);
      updateFirebaseCart(updatedCart);
      toast.success("Product added", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#367F32",
          color: "#fff",
          fontSize: "1.2rem",
          marginRight: "1rem",
        },
      });
    }
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity - 1,
              stock: cartItem.stock + 1,
            }
          : cartItem
      );
      setCartItems(updatedCart);
      updateFirebaseCart(updatedCart);
      toast.error("Product removed", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#E51313",
          color: "#fff",
          fontSize: "1.2rem",
          marginRight: "1rem",
        },
      });
    }
  };

  const handleRemoveItem = async (item) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCart);
    updateFirebaseCart(updatedCart);
    try {
      const userCartRef = doc(db, "carts", user.uid);
      await setDoc(userCartRef, { cartItems: updatedCart });

      toast.error(`${item.quantity} ${item.name} removed`, {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#E51313",
          color: "#fff",
          fontSize: "1.2rem",
          marginRight: "1rem",
        },
      });
    } catch (error) {
      console.error("Error updating cart in Firebase:", error);
    }
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();

    if (discountCode === "SHOP10") {
      setValidDiscount(true);
      toast.success("Discount applied", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#367F32",
          color: "#fff",
          fontSize: "1.2rem",
          marginRight: "1rem",
        },
      });
    } else {
      setValidDiscount(false);
      toast.error("Invalid discount code", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#E51313",
          color: "#fff",
          fontSize: "1.2rem",
          marginRight: "1rem",
        },
      });
    }
  };

  const updateFirebaseCart = async (updatedCart) => {
    try {
      const userCartRef = doc(db, "carts", user.uid);
      await setDoc(userCartRef, { cartItems: updatedCart });
      updateUserCart(updatedCart);
    } catch (error) {
      console.error("Error updating cart in Firebase:", error);
    }
  };

  const cartSubTotal = cartItems.reduce((total, item) => {
    return total + calculateTotalPrice(item);
  }, 0);

  const orderTotal = cartSubTotal;

  return (
    <>
      <PageHeader title="Shop cart" curPage={"Shop cart"} />

      <div className="shop-cart padding-tb">
        <div className="container">
          <div className="section-wrapper">
            {cartItems.length === 0 ? (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h2 className="title text-center display-6 text-danger mb-4 fw-bold fst-italic">
                  There are not products in the cart
                </h2>
                <Link
                  className="fs-4 text-white fw-semibold bg-success py-2 px-3 rounded-2 mt-5"
                  to="/shop"
                >
                  Go to Shop
                </Link>
              </div>
            ) : (
              <>
                <div className="cart-top">
                  <table>
                    <thead>
                      <tr>
                        <th className="cat-product">Product</th>
                        <th className="cat-price">Price</th>
                        <th className="cat-quantity">Quantity</th>
                        <th className="cat-topprice">Total</th>
                        <th className="cat-edit">Edit</th>
                      </tr>
                    </thead>

                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.id}>
                          <td className="product-item cat-product">
                            <div className="p-thumb">
                              <Link to={`/shop/${item.id}`}>
                                <img src={item.img} alt={item.name} />
                              </Link>
                            </div>
                            <div className="p-content">
                              <Link to={`/shop/${item.id}`}>{item.name}</Link>
                            </div>
                          </td>

                          <td className="cat-price">$ {item.price}</td>

                          <td className="cat-quantity">
                            <div className="cart-plus-minus">
                              <div
                                className="dec qtybutton"
                                onClick={() => handleDecrease(item)}
                              >
                                -
                              </div>
                              <input
                                type="text"
                                className="cart-plus-minus-box"
                                name="qtybutton"
                                value={item.quantity}
                                readOnly
                              />
                              <div
                                className="inc qtybutton"
                                onClick={() => handleIncrease(item)}
                              >
                                +
                              </div>
                            </div>
                          </td>

                          <td className="cat-toprice">
                            {validDiscount ? (
                              <span>
                                ${calculateTotalPrice(item).toFixed(1)}{" "}
                                <span className="text-danger ms-2">-10%</span>
                              </span>
                            ) : (
                              `$${calculateTotalPrice(item)}`
                            )}
                          </td>

                          <td className="cat-edit">
                            <a href="#" onClick={() => handleRemoveItem(item)}>
                              <img src={delImgUrl} alt="delete-product" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="cart-bottom">
                  <div className="cart-checkout-box">
                    <form className="coupon" onSubmit={handleApplyCoupon}>
                      <input
                        className="cart-page-input-text"
                        type="text"
                        name="coupon"
                        id="coupon"
                        placeholder="Coupon code ...."
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                      />
                      <input type="submit" value="Apply coupon" />
                    </form>

                    <form
                      className="cart-checkout"
                      onClick={(e) => e.preventDefault()}
                    >
                      <input type="submit" value="Update cart" />
                      <div>
                        <CheckOutPage />
                      </div>
                    </form>
                  </div>

                  <div className="shiping-box">
                    <div className="row">
                      <div className="col-md-6 col-12">
                        <div className="calculate-shiping">
                          <h3>Calculate shipping</h3>
                          <div className="outline-select">
                            <select
                              required
                              onChange={(e) =>
                                setSelectedCountry(e.target.value)
                              }
                              value={selectedCountry}
                            >
                              <option value="" disabled>
                                Select country
                              </option>
                              <option value="ar">Argentina</option>
                              <option value="usa">USA</option>
                              <option value="uk">United Kingdom</option>
                            </select>
                            <span className="select-icon">
                              <i className="icofont-rounded-down"></i>
                            </span>
                          </div>

                          <div className="outline-select shipping-select">
                            <select required>
                              <option value="" disabled={!selectedCountry}>
                                Select city
                              </option>
                              {cities.map((city, index) => (
                                <option key={index} value={city}>
                                  {city}
                                </option>
                              ))}
                            </select>
                            <span className="select-icon">
                              <i className="icofont-rounded-down"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="cart-page-input-text"
                            name="postalCode"
                            id="postalCode"
                            placeholder="PostCode/ZIP"
                            required
                          />
                          <button type="submit">Update adress</button>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="cart-overview">
                          <h3>Cart totals</h3>
                          <ul className="lab-ul">
                            <li>
                              <span className="pull-left">Cart subtotal</span>
                              <p className="pull-right">$ {cartSubTotal}</p>
                            </li>
                            <li>
                              <span className="pull-left">
                                Shipping and handling
                              </span>
                              <p className="pull-right">Free shipping</p>
                            </li>
                            <li>
                              <span className="pull-left">
                                Purchase discount
                              </span>
                              <p className="pull-right">
                                {validDiscount ? "Yes" : "No"}
                              </p>
                            </li>
                            <li>
                              <span className="pull-left">Order total</span>
                              <p className="pull-right">
                                $ {orderTotal.toFixed(2)}
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
