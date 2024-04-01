import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";
import delImgUrl from "../assets/images/shop/del.png";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCartItems);
  }, []);

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
    return item.price * item.quantity;
  };

  const handleIncrease = (item) => {
    item.quantity += 1;
    setCartItems([...cartItems]);

    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      setCartItems([...cartItems]);

      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  };

  const handleRemoveItem = (item) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedCart);

    updateLocalStorage(updatedCart);
  };

  const updateLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
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
                  {cartItems.map((item, i) => (
                    <tr key={i}>
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
                        ${calculateTotalPrice(item)}
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
                <form className="coupon" onClick={(e) => e.preventDefault()}>
                  <input
                    className="cart-page-input-text"
                    type="text"
                    name="coupon"
                    id="coupon"
                    placeholder="Coupon code ...."
                  />
                  <input type="submit" value="Apply coupon" />
                </form>

                <form
                  className="cart-checkout"
                  onClick={(e) => e.preventDefault()}
                >
                  <input type="submit" value="Update cart" />
                  <div>CheckOutPage</div>
                </form>
              </div>

              <div className="shiping-box">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="calculate-shiping">
                      <h3>Calculate shiping</h3>
                      <div className="outline-select">
                        <select
                          required
                          onChange={(e) => setSelectedCountry(e.target.value)}
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
                  <div className="col-md-6 col-12"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
