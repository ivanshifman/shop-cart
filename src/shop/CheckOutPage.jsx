import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../components/modal.css";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

const CheckOutPage = () => {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState("visa");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  const onSubmitTwo = (data) => {
    console.log(data);
    reset();
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleOrderConfirm = () => {
    alert("Your order is placed successfuly!");
    localStorage.removeItem("cart");
    navigate(from, { replace: true });
  };

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
        <div className="modal-dialog text-center m-3">
          <h5 className="px-3 mb-3 w-100">Select your payment method</h5>
          <div className="modal-content w-100">
            <div className="modal-body w-100">
              <div className="tabs mt-3">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
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
                  <li className="nav-item" role="presentation">
                    <a
                      className={`nav-link ${
                        activeTab === "paypal" ? "active" : ""
                      }`}
                      onClick={() => handleTabChange("paypal")}
                    >
                      <img
                        src="https://i.imgur.com/yK7EDD1.png"
                        alt="paypal"
                        width="80"
                      />
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
                        onSubmit={handleSubmit(onSubmit)}
                        className="form mt-3"
                      >
                        <div className="inputbox">
                          <input
                            type="text"
                            id="name"
                            className="form-control"
                            {...register("name", {
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
                          {errors.name && (
                            <p className="fs-6 text-danger fw-bold">
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                        <div className="inputbox">
                          <input
                            type="tel"
                            id="phone"
                            className="form-control"
                            {...register("phone", {
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
                          <span>Card number</span>
                          {errors.phone && (
                            <p className="fs-6 text-danger fw-bold">
                              {errors.phone.message}
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
                                minLength: {
                                  value: 7,
                                  message: "Address must have seven numbers",
                                },
                                maxLength: {
                                  value: 30,
                                  message: "Address must have thirty numbers",
                                },
                              })}
                            />
                            <span>Address </span>
                            {errors.address && (
                              <p className="fs-6 text-danger fw-bold">
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
                              <p className="fs-6 text-danger fw-bold">
                                {errors.cvv.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="px-5 pay">
                          <button
                            type="submit"
                            className="btn btn-success btn-block w-100"
                            onClick={handleOrderConfirm}
                          >
                            Add card
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div
                    className={`tab-pane fade ${
                      activeTab === "paypal" ? "show active" : ""
                    }`}
                    id="paypal"
                    role="tabpanel"
                    aria-labelledby="paypal-tab"
                  >
                    <form
                      onSubmit={handleSubmit(onSubmitTwo)}
                      className="mt-4 mx-4"
                    >
                      <div className="text-center">
                        <h5>Paypal account info</h5>
                      </div>
                      <div className="form mt-3">
                        <div className="inputbox">
                          <input
                            type="text"
                            id="namepaypal"
                            className="form-control"
                            {...register("namepaypal", {
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
                          {errors.namepaypal && (
                            <p className="fs-6 text-danger fw-bold">
                              {errors.namepaypal.message}
                            </p>
                          )}
                        </div>
                        <div className="inputbox">
                          <input
                            type="tel"
                            id="numberpaypal"
                            className="form-control"
                            {...register("numberpaypal", {
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
                          {errors.numberpaypal && (
                            <p className="fs-6 text-danger fw-bold">
                              {errors.numberpaypal.message}
                            </p>
                          )}
                        </div>
                        <div className="d-flex flex-column">
                          <div className="inputbox">
                            <input
                              type="email"
                              id="emailpaypal"
                              className="form-control"
                              {...register("emailpaypal", {
                                required: {
                                  value: true,
                                  message: "Email is required",
                                },
                                pattern: {
                                  value:
                                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                  message: "Invalid email",
                                },
                              })}
                            />
                            <span>Enter your email </span>
                            {errors.emailpaypal && (
                              <p className="fs-6 text-danger fw-bold">
                                {errors.emailpaypal.message}
                              </p>
                            )}
                          </div>

                          <div className="inputbox">
                            <input
                              type="email"
                              id="emailrepeat"
                              className="form-control"
                              {...register("emailrepeat", {
                                required: {
                                  value: true,
                                  message: "Confirm email is required",
                                },
                                validate: (value) =>
                                  value === watch("emailpaypal") ||
                                  "Emils do not match",
                              })}
                            />
                            <span>Repeat your email </span>
                            {errors.emailrepeat && (
                              <p className="fs-6 text-danger fw-bold">
                                {errors.emailrepeat.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="px-5 pay">
                          <button
                            type="submit"
                            className="btn btn-success btn-block w-100"
                            onClick={handleOrderConfirm}
                          >
                            Add paypal
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
