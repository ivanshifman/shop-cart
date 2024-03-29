import { useForm } from "react-hook-form";

const subtitle = "Save the day";
const title = (
  <h2 className="title">
    Join on day long free workshop for{" "}
    <b>
      advance <span>mastering</span> on sales
    </b>
  </h2>
);
const desc = "Limited time offer, hurry up!";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <section className="register-section padding-tb pb-5">
      <div className="container">
        <div className="row g-4 row-cols-lg-2 row-cols-1 aling-items-center">
          <div className="col">
            <div className="section-header">
              <span className="subtitle">{subtitle}</span>
              {title}
              <p>{desc}</p>
            </div>
          </div>
          <div className="col">
            <div className="section-wrapper">
              <h4>Register now</h4>
              <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex flex-column mb-3">
                  <input
                    type="text"
                    placeholder="Username"
                    className="reg-input"
                    id="username"
                    {...register("username", {
                      required: {
                        value: true,
                        message: "Name is required",
                      },
                      pattern: {
                        value: /^[a-zA-Z]+$/,
                        message: "Name must not contain numbers or spaces",
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
                  {errors.username && (
                    <span className="fs-6 text-danger fw-bold">
                      {errors.username.message}
                    </span>
                  )}
                </div>
                <div className="d-flex flex-column mb-3">
                  <input
                    type="email"
                    placeholder="Email"
                    className="reg-input"
                    id="email"
                    {...register("email", {
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
                  {errors.email && (
                    <span className="fs-6 text-danger fw-bold">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="d-flex flex-column mb-3">
                  <input
                    type="tel"
                    placeholder="Phone"
                    className="reg-input"
                    id="phone"
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
                        message: "Phone must be less than 15 characters",
                      },
                    })}
                  />
                  {errors.phone && (
                    <span className="fs-6 text-danger fw-bold">
                      {errors.phone.message}
                    </span>
                  )}
                </div>

                <button type="submit" className="lab-btn">
                  Register now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
