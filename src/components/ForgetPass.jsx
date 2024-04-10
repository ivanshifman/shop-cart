import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate, useLocation, Link } from "react-router-dom";

const title = "Recover password";
const btnText = "Send";

const ForgetPass = () => {
  const { user, forgetPassword } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleForgetPass = async () => {
    const email = watch("emailforget");
    try {
      await forgetPassword(email);
      alert("Message sent, check your email box");
      navigate(from, { replace: true });
    } catch (error) {
      setErrorMessage(
        "Failed to send reset email. Please check your email address."
      );
    }
  };

  return (
    <>
      <div className="login-section padding-tb section-bg">
        <div className="container">
          <div className="account-wrapper">
            <h3 className="title">{title}</h3>
            <form
              className="account-form"
              onSubmit={handleSubmit(handleForgetPass)}
            >
              <div className="form-group">
                <input
                  type="email"
                  id="emailforget"
                  placeholder="Email address *"
                  {...register("emailforget", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email",
                    },
                  })}
                />
                {errors.emailforget && (
                  <p className="fs-6 text-danger fw-bold">
                    {errors.emailforget.message}
                  </p>
                )}
              </div>

              <div className="form-group">
                <button className="d-block lab-btn" type="submit">
                  <span>{btnText}</span>
                </button>
              </div>
              {errorMessage && (
                <p className="text-danger fw-bold">{errorMessage}</p>
              )}
            </form>

            <div className="account-bottom">
              <span className="d-block cate pt-1">
                <Link to="/login">Do you remember your password?</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPass;
