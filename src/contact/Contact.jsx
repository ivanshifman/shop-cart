import { useForm } from "react-hook-form";
import GoogleMap from "../components/GoogleMap";
import PageHeader from "../components/PageHeader";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase.config";

const subTitle = "Get in touch with us";
const title = "We're always eager to hear from you!";
const conSubTitle = "Get in touch with contact us";
const conTitle =
  "Fill the form below so we can get to know you and your needs better.";
const btnText = "Send our message";

const contactList = [
  {
    imgUrl: "/src/assets/images/icon/01.png",
    imgAlt: "contact icon",
    title: "Office Address",
    desc: "1201 park street, Fifth Avenue",
  },
  {
    imgUrl: "/src/assets/images/icon/02.png",
    imgAlt: "contact icon",
    title: "Phone number",
    desc: "+22698 745 632,02 982 745",
  },
  {
    imgUrl: "/src/assets/images/icon/03.png",
    imgAlt: "contact icon",
    title: "Send email",
    desc: "admin@shopcart.com",
  },
  {
    imgUrl: "/src/assets/images/icon/04.png",
    imgAlt: "contact icon",
    title: "Our website",
    desc: "www.shopcart.com",
  },
];

const Contact = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const userEmail = user?.email;

  const onSubmit = (data) => {
    const client = {
      information: data,
      userId: user.uid,
      userEmail: user.email,
    };
    const clientContact = collection(db, "clientContact");
    addDoc(clientContact, client);
    toast.success("Your message has been sent");
    reset();
  };

  return (
    <>
      <PageHeader title={"Contact"} curPage={"Contact"} />
      <div className="map-address-section padding-tb section-bg">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">{subTitle}</span>
            <h2 className="title">{title}</h2>
          </div>
          <div className="section-wrapper">
            <div className="row flex-row-reverse">
              <div className="col-xl-4 col-lg-5 col-12">
                <div className="contact-wrapper">
                  {contactList.map((val, i) => (
                    <div key={i} className="contact-item">
                      <div className="contact-thumb">
                        <img src={val.imgUrl} alt={val.imgAlt} />
                      </div>
                      <div className="contact-content">
                        <h6 className="title">{val.title}</h6>
                        <p>{val.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-xl-8 col-lg-7 col-12">
                <GoogleMap />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-section padding-tb">
        <div className="container">
          <div className="section-header text-center">
            <span className="subtitle">{conSubTitle}</span>
            <h2 className="title">{conTitle}</h2>
          </div>

          <div className="section-wrapper">
            <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <input
                  type="text"
                  id="namecon"
                  placeholder="Your name *"
                  {...register("namecon", {
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                    pattern: {
                      value: /^[^\d]*$/,
                      message: "Name must not contain numbers",
                    },
                    minLength: {
                      value: 6,
                      message: "Full name must be at least 6 characters",
                    },
                    maxLength: {
                      value: 30,
                      message: "Full name must be less than 30 characters",
                    },
                  })}
                />
                {errors.namecon && (
                  <p className="fs-6 text-danger fw-bold">
                    {errors.namecon.message}
                  </p>
                )}
              </div>
              <div className="form-group">
                <input
                  type="email"
                  id="emailcon"
                  placeholder="Your email *"
                  {...register("emailcon", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email",
                    },
                    validate: (value) =>
                      value === userEmail || "Emails do not match user's email",
                  })}
                />
                {errors.emailcon && (
                  <p className="fs-6 text-danger fw-bold">
                    {errors.emailcon.message}
                  </p>
                )}
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  id="phonecon"
                  placeholder="Your phone *"
                  {...register("phonecon", {
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
                {errors.phonecon && (
                  <p className="p-error text-danger fw-bold">
                    {errors.phonecon.message}
                  </p>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="addresscon"
                  placeholder="Your address *"
                  {...register("addresscon", {
                    required: {
                      value: true,
                      message: "Address is required",
                    },
                  })}
                />
                {errors.addresscon && (
                  <p className="p-error text-danger fw-bold">
                    {errors.addresscon.message}
                  </p>
                )}
              </div>
              <div className="form-group w-100">
                <textarea
                  id="messagecon"
                  rows="8"
                  style={{ resize: "none" }}
                  placeholder="Your message *"
                  {...register("messagecon", {
                    required: {
                      value: true,
                      message: "Message is required",
                    },
                    minLength: {
                      value: 20,
                      message: "Message must be more than 20 characters",
                    },
                    maxLength: {
                      value: 220,
                      message: "Message must be less than 220 characters",
                    },
                  })}
                ></textarea>
                {errors.messagecon && (
                  <p className="fs-6 text-danger fw-bold">
                    {errors.messagecon.message}
                  </p>
                )}
              </div>
              <div className="form-group w-100 text-center">
                <button className="lab-btn" type="submit">
                  <span>{btnText}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
