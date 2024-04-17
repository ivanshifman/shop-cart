import { useContext, useState } from "react";
import Ratting from "../components/Ratting";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../firebase/firebase.config";

const reviwtitle = "Add a Review";

let ReviewList = [
  {
    imgUrl: "/images/instructor/01.jpg",
    imgAlt: "Client thumb",
    name: "Ganelon Boileau",
    date: "Posted on Sep 10, 2024 at 6:57 am",
    desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
  {
    imgUrl: "/images/instructor/02.jpg",
    imgAlt: "Client thumb",
    name: "Morgana Cailot",
    date: "Posted on Sep 10, 2024 at 6:57 am",
    desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
  {
    imgUrl: "/images/instructor/03.jpg",
    imgAlt: "Client thumb",
    name: "Telford Bois",
    date: "Posted on Sep 10, 2024 at 6:57 am",
    desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
  {
    imgUrl: "/images/instructor/04.jpg",
    imgAlt: "Client thumb",
    name: "Cher Daviau",
    date: "Posted on Sep 10, 2024 at 6:57 am",
    desc: "Enthusiast build innovativ initiatives before lonterm high-impact awesome theme seo psd porta monetize covalent leadership after without resource.",
  },
];

const Review = ({ item }) => {
  const { img, name } = item;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { user } = useContext(AuthContext);

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

  const [reviewShow, setReviewShow] = useState(true);

  return (
    <>
      <ul
        className={`review-nav lab-ul ${
          reviewShow ? "RevActive" : "DescActive"
        }`}
      >
        <li className="desc" onClick={() => setReviewShow(!reviewShow)}>
          Description
        </li>
        <li className="rev" onClick={() => setReviewShow(!reviewShow)}>
          Reviews 4
        </li>
      </ul>

      <div
        className={`review-content ${
          reviewShow ? "review-content-show" : "description-show"
        }`}
      >
        <div className="review-showing">
          <ul className="content lab-ul">
            {ReviewList.map((review, i) => (
              <li key={i}>
                <div className="post-thumb">
                  <img src={review.imgUrl} alt={review.imgAlt} />
                </div>
                <div className="post-content">
                  <div className="entry-meta">
                    <div className="posted-on">
                      <a href="#">{review.name}</a>
                      <p>{review.date}</p>
                    </div>
                  </div>
                  <div className="entry-content">
                    <p>{review.desc}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="client-review">
            <div className="review-form">
              <div className="review-title">
                <h5>{reviwtitle}</h5>
              </div>

              <form className="row" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-4 col-12 d-flex flex-column">
                  <input
                    type="text"
                    id="name"
                    className="mb-2"
                    placeholder="Full name *"
                    {...register("name", {
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
                  {errors.name && (
                    <span className="fs-6 text-danger fw-bold mb-1">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div className="col-md-4 col-12 d-flex flex-column">
                  <input
                    type="text"
                    id="email"
                    className="mb-2"
                    placeholder="Email *"
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
                      validate: (value) =>
                        value === userEmail ||
                        "Emails do not match user's email",
                    })}
                  />
                  {errors.email && (
                    <span className="fs-6 text-danger fw-bold mb-1">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="col-md-4 col-12">
                  <div className="rating">
                    <span className="me-2">Your rating</span>
                    <Ratting />
                  </div>
                </div>
                <div className="col-md-12 col-12 d-flex flex-column">
                  <textarea
                    id="message"
                    rows="8"
                    style={{ resize: "none" }}
                    placeholder="Type here message *"
                    {...register("message", {
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
                  {errors.message && (
                    <span className="fs-6 text-danger fw-bold mt-2">
                      {errors.message.message}
                    </span>
                  )}
                </div>
                <div className="col-12">
                  <button type="submit" className="default-button">
                    <span>Submit review</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="description">
          <p>
            Explore a wide range of high-quality products that fit your
            lifestyle at Shop Cart, your one-stop destination for online
            shopping. Discover the perfect solution for your needs, all in one
            place. Shop now and enjoy a seamless shopping experience!
          </p>

          <div className="post-item">
            <div className="post-thumb">
              <img src={img} alt={name} />
            </div>
            <div className="post-content px-2">
              <ul className="lab-ul">
                <li>
                  Explore a wide range of high-quality products: Look for
                  different options that suit your needs and preferences.
                </li>
                <li>
                  Products tailored to your lifestyle: Choose products that
                  integrate seamlessly with your daily life and lifestyle.
                </li>
                <li>
                  One-stop destination for online shopping: Use platforms that
                  offer you a wide variety of products and a convenient shopping
                  experience.
                </li>
                <li>
                  All in one place: Simplify your shopping experience by finding
                  everything you need in one platform.
                </li>
                <li>
                  Enjoy a seamless shopping experience: Look for platforms that
                  offer you a smooth and hassle-free shopping experience.
                </li>
              </ul>
            </div>
          </div>

          <p>
            Explore a wide range of high-quality products that fit your
            lifestyle at Shop Cart, your one-stop destination for online
            shopping. Discover the perfect solution for your needs, all in one
            place. Shop now and enjoy a seamless shopping experience!
          </p>
        </div>
      </div>
    </>
  );
};

export default Review;
