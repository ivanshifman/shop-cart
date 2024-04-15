import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../components/modal.css";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

const CheckOutPage = () => {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("visa");
  const { user, userCart, updateUserCart } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const userEmail = user?.email

  const handleOrderConfirm = async (data) => {
    try {
      const userCartRef = doc(db, "carts", user.uid);
      await setDoc(userCartRef, { cartItems: [] });
      updateUserCart([]);
      const client = {
        information: data,
        cart: userCart,
        userId: user.uid,
        userEmail: user.email,
      };
      const clientCart = collection(db, "cartshop");
      addDoc(clientCart, client);
      toast.success("Your order is placed successfuly!");
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Error completing purchase:", error);
      toast.error("Failed to complete purchase. Please try again.");
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  return (
    <div className="modalCard">
      <Button variant="primary" className="py-2" onClick={handleShow}>
        Proceed to Checkout
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        className="modal fade"
        centered
      >
        <div className="modal-dialog text-center m-3 overflow-auto">
          <h5 className="px-3 mb-3 w-100">Select your payment method</h5>
          <div className="modal-content w-100">
            <div className="modal-body w-100">
              <div className="tabs mt-3">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item w-50" role="presentation">
                    <a
                      className={`nav-link ${
                        activeTab === "visa" ? "active" : ""
                      }`}
                      onClick={() => handleTabChange("visa")}
                    >
                      <img
                        src="https://alvaciomx.com/wp-content/uploads/2023/07/visa-and-mastercard-logo-26.png"
                        alt="visa"
                        width="80"
                      />
                    </a>
                  </li>
                  <li className="nav-item w-50" role="presentation">
                    <a
                      className={`nav-link ${
                        activeTab === "identity" ? "active" : ""
                      }`}
                      onClick={() => handleTabChange("identity")}
                    >
                      <i className="icofont-papers"></i>
                    </a>
                  </li>
                </ul>

                <div className="tab-content" id="myTabContent">
                  <div
                    className={`tab-pane fade ${
                      activeTab === "visa" ? "show active" : ""
                    }`}
                    id="visa"
                    role="tabpanel"
                    aria-labelledby="visa-tab"
                  >
                    <div className="mt-4 mx-4">
                      <div className="text-center">
                        <h5>Credit card</h5>
                      </div>
                      <form
                        onSubmit={handleSubmit(handleOrderConfirm)}
                        className="form mt-3"
                      >
                        <div className="inputbox">
                          <input
                            type="text"
                            id="nameshop"
                            className="form-control"
                            {...register("nameshop", {
                              required: {
                                value: true,
                                message: "Name is required",
                              },
                              pattern: {
                                value: /^[a-zA-Z]+$/,
                                message:
                                  "Name must not contain numbers or spaces",
                              },
                              minLength: {
                                value: 3,
                                message: "Name must be at least 3 characters",
                              },
                              maxLength: {
                                value: 20,
                                message: "Name must be less than 20 characters",
                              },
                            })}
                          />
                          <span>Cardholder name</span>
                          {errors.nameshop && (
                            <p className="p-error text-danger fw-bold">
                              {errors.nameshop.message}
                            </p>
                          )}
                        </div>
                        <div className="inputbox">
                          <input
                            type="tel"
                            id="phoneshop"
                            className="form-control"
                            {...register("phoneshop", {
                              required: {
                                value: true,
                                message: "Number is required",
                              },
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "Number must contain only numbers",
                              },
                              minLength: {
                                value: 16,
                                message:
                                  "Number can only contain 16 characters",
                              },
                              maxLength: {
                                value: 16,
                                message:
                                  "Number can only contain 16 characters",
                              },
                            })}
                          />
                          <span>Card number</span>
                          {errors.phoneshop && (
                            <p className="p-error text-danger fw-bold">
                              {errors.phoneshop.message}
                            </p>
                          )}
                        </div>
                        <div className="d-flex flex-column">
                          <div className="inputbox">
                            <input
                              type="text"
                              id="address"
                              className="form-control"
                              {...register("address", {
                                required: {
                                  value: true,
                                  message: "Address is required",
                                },
                              })}
                            />
                            <span>Address </span>
                            {errors.address && (
                              <p className="p-error text-danger fw-bold">
                                {errors.address.message}
                              </p>
                            )}
                          </div>
                          <div className="inputbox">
                            <input
                              type="number"
                              id="cvv"
                              className="form-control"
                              {...register("cvv", {
                                required: {
                                  value: true,
                                  message: "CVV is required",
                                },
                                pattern: {
                                  value: /^[0-9]+$/,
                                  message: "CVV must contain only numbers",
                                },
                                minLength: {
                                  value: 3,
                                  message: "CVV must have three numbers",
                                },
                                maxLength: {
                                  value: 3,
                                  message: "CVV must have three numbers",
                                },
                              })}
                            />
                            <span>CVV </span>
                            {errors.cvv && (
                              <p className="p-error text-danger fw-bold">
                                {errors.cvv.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="px-5 pay">
                          <button
                            type="submit"
                            className="btn btn-success btn-block w-100"
                            onClick={handleSubmit(handleOrderConfirm)}
                          >
                            Add card
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div
                    className={`tab-pane fade ${
                      activeTab === "identity" ? "show active" : ""
                    }`}
                    id="identity"
                    role="tabpanel"
                    aria-labelledby="identity-tab"
                  >
                    <form
                      onSubmit={handleSubmit(handleOrderConfirm)}
                      className="mt-4 mx-4"
                    >
                      <div className="text-center">
                        <h5>Identity information</h5>
                      </div>
                      <div className="form mt-3">
                        <div className="inputbox">
                          <input
                            type="text"
                            id="nameidentity"
                            className="form-control"
                            {...register("nameidentity", {
                              required: {
                                value: true,
                                message: "Name is required",
                              },
                              pattern: {
                                value: /^[a-zA-Z]+$/,
                                message:
                                  "Name must not contain numbers or spaces",
                              },
                              minLength: {
                                value: 3,
                                message: "Name must be at least 3 characters",
                              },
                              maxLength: {
                                value: 20,
                                message: "Name must be less than 20 characters",
                              },
                            })}
                          />
                          <span>Your name </span>
                          {errors.nameidentity && (
                            <p className="p-error text-danger fw-bold">
                              {errors.nameidentity.message}
                            </p>
                          )}
                        </div>
                        <div className="inputbox">
                          <input
                            type="tel"
                            id="numberidentity"
                            className="form-control"
                            {...register("numberidentity", {
                              required: {
                                value: true,
                                message: "Phone is required",
                              },
                              pattern: {
                                value: /^[0-9]+$/,
                                message: "Phone must contain only numbers",
                              },
                              minLength: {
                                value: 8,
                                message: "Phone must be at least 8 characters",
                              },
                              maxLength: {
                                value: 15,
                                message:
                                  "Phone must be less than 15 characters",
                              },
                            })}
                          />
                          <span>Your number </span>
                          {errors.numberidentity && (
                            <p className="p-error text-danger fw-bold">
                              {errors.numberidentity.message}
                            </p>
                          )}
                        </div>
                        <div className="d-flex flex-column">
                          <div className="inputbox">
                            <input
                              type="email"
                              id="emailidentity"
                              className="form-control"
                              {...register("emailidentity", {
                                required: {
                                  value: true,
                                  message: "Email is required",
                                },
                                pattern: {
                                  value:
                                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                  message: "Invalid email",
                                },
                                validate: (value) =>
                                  value === userEmail ||
                                  "Emails do not match user's email",
                              })}
                            />
                            <span>Enter your email </span>
                            {errors.emailidentity && (
                              <p className="p-error text-danger fw-bold">
                                {errors.emailidentity.message}
                              </p>
                            )}
                          </div>

                          <div className="inputbox">
                            <input
                              type="email"
                              id="emailrepeatidentity"
                              className="form-control"
                              {...register("emailrepeatidentity", {
                                required: {
                                  value: true,
                                  message: "Confirm email is required",
                                },
                                validate: (value) =>
                                  value === watch("emailidentity") ||
                                  "Emils do not match",
                              })}
                            />
                            <span>Repeat your email </span>
                            {errors.emailrepeatidentity && (
                              <p className="p-error text-danger fw-bold">
                                {errors.emailrepeatidentity.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="px-5 pay">
                          <button
                            type="submit"
                            className="btn btn-success btn-block w-100"
                            onClick={handleSubmit(handleOrderConfirm)}
                          >
                            Add information
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <p className="mt-2 px-1 p-Disclaimer">
                  ShopCart is not liable for issues with credit card or PayPal
                  transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CheckOutPage;
