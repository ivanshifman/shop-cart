import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import toast from "react-hot-toast";

const title = "Register";
const socialTitle = "Login with social media";
const btnText = "Sign Up now";

const socialList = [
  { iconName: "icofont-facebook", className: "facebook" },
  { iconName: "icofont-twitter", className: "twitter" },
  { iconName: "icofont-linkedin", className: "linkedin" },
  { iconName: "icofont-instagram", className: "instagram" },
  { iconName: "icofont-pinterest", className: "pinterest" },
];

const SignUp = () => {
  const { signUpWithGmail, createUser, user } = useContext(AuthContext);
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

  const handleRegister = () => {
    signUpWithGmail()
      .then((res) => {
        const user = res.user;
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSignUp = () => {
    const email = watch("emailsign");
    const password = watch("passwordsign");
    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Account creted succesfully done!")
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("The user already exists");
      });
  };

  return (
    <>
      <div className="login-section padding-tb section-bg">
        <div className="container">
          <div className="account-wrapper">
            <h3 className="title">{title}</h3>
            <form
              className="account-form"
              onSubmit={handleSubmit(handleSignUp)}
            >
              <div className="form-group">
                <input
                  type="text"
                  id="namesign"
                  placeholder="Full name *"
                  {...register("namesign", {
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                    pattern: {
                      value: /^[^\d]*$/,
                      message: "Name must not contain numbers",
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
                {errors.namesign && (
                  <p className="fs-6 text-danger fw-bold">
                    {errors.namesign.message}
                  </p>
                )}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="emailsign"
                  placeholder="Email address *"
                  {...register("emailsign", {
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
                {errors.emailsign && (
                  <p className="fs-6 text-danger fw-bold">
                    {errors.emailsign.message}
                  </p>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="passwordsign"
                  placeholder="Password *"
                  {...register("passwordsign", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    pattern: {
                      value: /^\S+$/,
                      message: "Password cannot have spaces",
                    },
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Password must be less than 30 characters",
                    },
                  })}
                />
                {errors.passwordsign && (
                  <p className="fs-6 text-danger fw-bold">
                    {errors.passwordsign.message}
                  </p>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="passwordsignconfirm"
                  placeholder="Confirm password *"
                  {...register("passwordsignconfirm", {
                    required: {
                      value: true,
                      message: "Confirm password is required",
                    },
                    validate: (value) =>
                      value === watch("passwordsign") ||
                      "Passwords do not match",
                  })}
                />
                {errors.passwordsignconfirm && (
                  <p className="fs-6 text-danger fw-bold">
                    {errors.passwordsignconfirm.message}
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
                Have an account? <Link to="/login">Login</Link>
              </span>
              <span className="or">
                <span>or</span>
              </span>
              <h5 className="subtitle">{socialTitle}</h5>
              <ul className="lab-ul social-icons justify-content-center">
                {socialList.map((val, i) => (
                  <li key={i}>
                    <button onClick={handleRegister} className="bg-transparent">
                      <a href="#" className={val.className}>
                        <i className={val.iconName}></i>
                      </a>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
