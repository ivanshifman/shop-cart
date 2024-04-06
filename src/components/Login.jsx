import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const title = "Login";
const socialTitle = "Login with social media";
const btnText = "Login now";

const socialList = [
  { iconName: "icofont-facebook", className: "facebook" },
  { iconName: "icofont-twitter", className: "twitter" },
  { iconName: "icofont-linkedin", className: "linkedin" },
  { iconName: "icofont-instagram", className: "instagram" },
  { iconName: "icofont-pinterest", className: "pinterest" },
];

const Login = () => {
  const { signUpWithGmail, login } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = ({ emaillog, passwordlog }) => {
    console.log(emaillog, passwordlog);
    login(emaillog, passwordlog)
      .then((res) => {
        const user = res.user;
        alert("Login successfully");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
      });
  };

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

  return (
    <>
      <div className="login-section padding-tb section-bg">
        <div className="container">
          <div className="account-wrapper">
            <h3 className="title">{title}</h3>
            <form className="account-form" onSubmit={handleSubmit(handleLogin)}>
              <div className="form-group">
                <input
                  type="email"
                  id="emaillog"
                  placeholder="Email address *"
                  {...register("emaillog", {
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
                {errors.emaillog && (
                  <p className="fs-6 text-danger fw-bold">
                    {errors.emaillog.message}
                  </p>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  id="passwordlog"
                  placeholder="Password *"
                  {...register("passwordlog", {
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
                {errors.passwordlog && (
                  <p className="fs-6 text-danger fw-bold">
                    {errors.passwordlog.message}
                  </p>
                )}
              </div>
              <div className="form-group">
                <div className="d-flex justify-content-between flex-wrap pt-sm-2">
                  <div className="checkgroup">
                    <input type="checkbox" id="checkbox" />
                    <label htmlFor="checkbox">Remember me</label>
                  </div>
                  <Link to="/forgetpass">Forget password?</Link>
                </div>
              </div>
              <div className="form-group">
                <button className="d-block lab-btn" type="submit">
                  <span>{btnText}</span>
                </button>
              </div>
            </form>

            <div className="account-bottom">
              <span className="d-block cate pt-1">
                Don't have an account? <Link to="/signup">Sign Up</Link>
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

export default Login;